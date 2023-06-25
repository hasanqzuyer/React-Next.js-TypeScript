import React, { useContext, useEffect, useState } from 'react';
import {
  TableContainer,
  TableWrapper,
  TableMain,
  TableHead,
  TableBody,
  TableHeadCell,
  TableHeadCellAction,
  TableBodyCell,
  TableHeadRow,
  TableBodyRow,
  TableEmpty,
} from 'components/custom/checkbox-table/styles';
import {
  TTableProps,
  TTableHeadItem,
} from 'components/custom/checkbox-table/types';
import getObjectDynamicPath from 'utilities/extended-proto/index';
import { BackupTableRounded } from '@mui/icons-material';
import { useModal } from 'hooks';
import { Modal } from 'components/custom';
import { Button, Checkbox } from 'components/ui';
import { Reorder } from 'framer-motion';
import { Stack } from 'components/system';
import {
  ArrowDownIcon,
  CarretDownIcon,
  ManageColumnsIcon,
} from 'components/svg';
import { useAppContext } from 'context';
import { OrderListDraggable } from './elements';

const Table = ({
  head = [],
  items = [],
  renderItem = (_b) => {},
  checkedRows,
  toggleSingleRow,
  toggleAllRows,
  currentPage,
  ...props
}: TTableProps) => {
  const [localHead, setLocalHead] = useState(head);
  const [tModal, openTModal, closeTModal] = useModal(false);

  const visibleItems = localHead.filter((x) => x.visible);

  const [headCheckbox, setHeadCheckbox] = useState(false);

  const handleHeadCheckbox = () => {
    console.log('HeadCheckbox clicked');
    if (toggleAllRows) {
      toggleAllRows();
    } else {
      setHeadCheckbox(!headCheckbox);
    }
  };

  const handleRowCheckbox = (rowData: any) => {
    console.log(rowData);
    if (headCheckbox) {
      setHeadCheckbox(!headCheckbox);
    }
    if (toggleSingleRow) toggleSingleRow(rowData.id);

    if (!toggleSingleRow) {
      // Rest of apps need to implement their logic for checking fields
      // toggleSingleRow(rowData.id);
    }
  };

  const { role } = useAppContext();

  useEffect(() => {
    if (toggleAllRows) {
      const containsAllElements =
        checkedRows!.length > 0 &&
        items.every((item) =>
          checkedRows?.some((number) => number === item.id)
        );
      console.log(containsAllElements);
      if (containsAllElements) {
        console.log('THis happened somehow?');
        setHeadCheckbox(true);
      } else {
        console.log('Denied Idiot');
        setHeadCheckbox(false);
      }
    }

    // console.log('Items: ', items);
    // console.log('Checked Rows: ', checkedRows);
    // console.log('test');
  }, [checkedRows, items, currentPage]);

  return (
    <TableContainer {...props}>
      {['ADMIN', 'SUPERADMIN'].includes(role) && (
        // TODO Remove Bulk actions
        // TODO transfer this to header
        <Stack
          style={{ justifyContent: 'flex-end', marginTop: '-60px' }}
          direction="horizontal"
        >
          <TableHeadCellAction color="primary" onClick={openTModal}>
            <ManageColumnsIcon />
          </TableHeadCellAction>
          <Button
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            color="default"
            variant="contained"
            size="large"
            onClick={() => {}}
          >
            Bulk Action <CarretDownIcon />
          </Button>
        </Stack>
      )}
      <TableWrapper>
        <TableMain>
          <TableHead>
            <TableHeadRow>
              {['ADMIN', 'SUPERADMIN'].includes(role) && (
                <TableHeadCell action>
                  <Checkbox value={headCheckbox} onValue={handleHeadCheckbox} />
                </TableHeadCell>
              )}
              {visibleItems.map((x: any) => (
                <TableHeadCell key={x.reference}>{x.label}</TableHeadCell>
              ))}
            </TableHeadRow>
          </TableHead>
          {!!items.length && (
            <TableBody>
              {/* eslint-disable-next-line arrow-body-style */}
              {items.map((rowData: any, rowIndex: number) => {
                return (
                  <TableBodyRow>
                    {['ADMIN', 'SUPERADMIN'].includes(role) && (
                      <TableBodyCell action>
                        <Checkbox
                          value={checkedRows?.includes(rowData.id)}
                          onValue={() => handleRowCheckbox(rowData)}
                        />
                      </TableBodyCell>
                    )}
                    {visibleItems.map((a: TTableHeadItem, b: number) => (
                      <TableBodyCell>
                        {renderItem({
                          headItem: a,
                          cell: {
                            index: b,
                            data: getObjectDynamicPath(rowData, a.reference),
                          },
                          row: {
                            index: rowIndex,
                            data: rowData,
                          },
                          table: items,
                        })}
                      </TableBodyCell>
                    ))}
                  </TableBodyRow>
                );
              })}
            </TableBody>
          )}
        </TableMain>
        {!items.length && <TableEmpty>No records</TableEmpty>}
      </TableWrapper>
      {tModal && (
        <Modal
          title="Manage columns"
          onClose={closeTModal}
          size="small"
          actions={[
            <Button color="primary" variant="contained" onClick={closeTModal}>
              Close
            </Button>,
          ]}
        >
          <Reorder.Group
            values={localHead}
            onReorder={setLocalHead}
            axis="y"
            as="div"
            style={{ height: '500px', overflowY: 'scroll' }}
          >
            {localHead.map((x) => (
              <OrderListDraggable
                key={x.reference}
                label={x.label}
                value={x.visible}
                reference={x.reference}
                item={x}
                onValue={(visible) =>
                  setLocalHead(
                    localHead.map((a) =>
                      a.reference === x.reference ? { ...a, visible } : a
                    )
                  )
                }
              />
            ))}
          </Reorder.Group>
        </Modal>
      )}
    </TableContainer>
  );
};

export default Table;
