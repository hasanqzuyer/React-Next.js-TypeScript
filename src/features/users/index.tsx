import React, { useState, useEffect, useMemo } from 'react';
import {
  UsersPageMain,
  UsersPageFilter,
  UsersPageFilterActions,
} from 'features/users/styles';
import { DUsersHead, DUsersFilters } from 'features/users/data';
import { CardWithText, NewCheckboxTable, Tabs } from 'components/custom';
import { SlidersHorizontalIcon, VerticalDotsIcon } from 'components/svg';
import { Button, Input, Pagination } from 'components/ui';
import { Grid, Stack, Collapse } from 'components/system';
import { TTableRenderItemObject } from 'components/custom/table/types';
import Link from 'next/link';
import { useModal, usePagination, useSnackbar } from 'hooks';
import ExportUsersModal from './elements/export-influencers-modal';
import UsersAPI from 'api/users';
import { IUser } from 'api/users/types';
import { getAge } from 'utilities/birthday-age-converter';

const UsersPage = () => {
  const [filters, setFilter] = useState<any>(DUsersFilters());
  const [eModal, openEModal, closeEModal] = useModal(false);
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>([]);
  const [checkedusers, setCheckedUsers] = useState<number[]>([]);

  const [filterOpen, setFilterOpen] = useState(false);

  const [tabs, setTabs] = useState(0);
  const { push } = useSnackbar();

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const clearFilters = () => {
    setFilter(DUsersFilters());
  };

  const applyFilters = () => {
    getAllUsers()
      .then((data) => setTotalColumnItems(data))
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  };

  const toggleUser = (rowId: number, checked: boolean) => {
    if (checked) {
      setCheckedUsers([...checkedusers, rowId]);
    } else {
      setCheckedUsers(checkedusers.filter((id) => id !== rowId));
    }
  };

  const toggleAllCheckedUsers = (checked: boolean) => {
    if (checked) {
      const currentPageIds = currentTableData.map((row) => row.id);
      const newSelectedRows = Array.from(
        new Set([...checkedusers, ...currentPageIds])
      );
      setCheckedUsers(newSelectedRows);
    } else {
      // Deselect all rows on the current page
      const currentPageIds = currentTableData.map((row) => row.id);
      const newSelectedRows = checkedusers.filter(
        (rowId) => !currentPageIds.includes(rowId)
      );
      setCheckedUsers(newSelectedRows);
    }
  };

  const getAllUsers = async (): Promise<any> => {
    try {
      const response = await UsersAPI.getUsers({
        ...filters,
      });

      if (response) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  useEffect(() => {
    getAllUsers()
      .then((data) => setTotalColumnItems(data))
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  }, []);

  let PageSize = 10;

  const { pagesCount, page, setTotalResults, handlePageChange, reload } =
    usePagination({
      limit: PageSize,
      page: 1,
      onChange: async (params, setPage) => {
        setPage(params.page);
        setTotalResults(totalColumnItems.length);
      },
    });

  useEffect(() => {
    setTotalResults(totalColumnItems.length);
  }, [totalColumnItems]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (page - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return totalColumnItems?.slice(firstPageIndex, lastPageIndex);
  }, [page, totalColumnItems, PageSize]);

  const renderItem = ({ headItem, row }: TTableRenderItemObject) => {
    const singleUser = row.data as IUser;
    if (headItem.reference === 'name') {
      return (
        <Link
          style={{ textDecoration: 'none', color: '#4f4f4f' }}
          href="/users/overview"
        >
          {singleUser.firstName} {singleUser.lastName}
        </Link>
      );
    }
    if (headItem.reference === 'location') {
      return singleUser.location;
    }
    if (headItem.reference === 'nationality') {
      return singleUser.nationality;
    }
    if (headItem.reference === 'age') {
      return getAge(singleUser.dateOfBirth);
    }
    if (headItem.reference === 'language') {
      return singleUser.language;
    }
    if (headItem.reference === 'applications') {
      return singleUser.applications.length;
    }
    if (headItem.reference === 'invested') {
      return `€${singleUser.invested ? singleUser.invested : 0}`;
    }
    if (headItem.reference === 'actions') {
      return <VerticalDotsIcon />;
    }

    return '';
  };

  return (
    <UsersPageMain>
      <CardWithText
        title="Users"
        actions={[
          <Button
            color={filterOpen ? 'secondary' : 'default'}
            variant="contained"
            onClick={toggleFilter}
            startIcon={<SlidersHorizontalIcon width="18" height="18" />}
          >
            Filters
          </Button>,
          <Button color="default" variant="contained" onClick={openEModal}>
            Export
          </Button>,
        ]}
      >
        <Stack>
          <Collapse removeGap in={filterOpen}>
            <UsersPageFilter>
              <Tabs
                tabs={['Info', 'Work Experience', 'Education', 'House']}
                value={tabs}
                onValue={setTabs}
              />
              <Grid columns={4}>
                <Input
                  type="text"
                  label="Search"
                  placeholder="Please Select"
                  value={filters.search}
                  onValue={(search) => setFilter({ ...filters, search })}
                />
                <Input
                  type="select"
                  label="Location"
                  placeholder="Please Select"
                  value={filters.location}
                  onValue={(location) => setFilter({ ...filters, location })}
                />
                <Input
                  type="select"
                  label="Nationality"
                  placeholder="Please Select"
                  value={filters.nationality}
                  onValue={(nationality) =>
                    setFilter({ ...filters, nationality })
                  }
                />
                <Input
                  type="min-max"
                  label="Age"
                  placeholder="Please Select"
                  value={filters.age}
                  onValue={(age) => setFilter({ ...filters, age })}
                />
                <Input
                  type="select"
                  label="Language"
                  placeholder="Please Select"
                  value={filters.language}
                  onValue={(language) => setFilter({ ...filters, language })}
                />
                <Input
                  type="min-max"
                  label="Applications"
                  placeholder="Please Select"
                  value={filters.applications}
                  onValue={(applications) =>
                    setFilter({ ...filters, applications })
                  }
                />
                <Input
                  type="min-max"
                  label="Invested"
                  placeholder="Please Select"
                  value={filters.invested}
                  onValue={(invested) => setFilter({ ...filters, invested })}
                />
                <Input
                  type="select"
                  label="Social Media"
                  placeholder="Please Select"
                  value={filters.socialMedia}
                  onValue={(socialMedia) =>
                    setFilter({ ...filters, socialMedia })
                  }
                />
              </Grid>
              <UsersPageFilterActions direction="horizontal">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={applyFilters}
                >
                  Filter
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={clearFilters}
                >
                  Clear filter
                </Button>
              </UsersPageFilterActions>
            </UsersPageFilter>
          </Collapse>
          <NewCheckboxTable
            head={DUsersHead}
            items={currentTableData}
            renderItem={renderItem}
            checkedRows={checkedusers}
            onSingleSelect={toggleUser}
            onSelectAll={toggleAllCheckedUsers}
          />
          <Pagination
            onChange={(_e, x) => handlePageChange(x)}
            page={page}
            count={pagesCount}
          />
        </Stack>
      </CardWithText>
      {eModal && <ExportUsersModal onClose={closeEModal} />}
    </UsersPageMain>
  );
};

export default UsersPage;
