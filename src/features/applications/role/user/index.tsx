import React, { useEffect, useMemo, useState } from 'react';
import {
  ProjectsMain,
  MarketTableItem,
  EllipsisText
} from 'features/opportunities/styles';
import Image from 'next/image';

import { CardWithText, Table } from 'components/custom';
import { Pagination } from 'components/ui';
import { DApplicationsHead } from 'features/applications/data';
import { Stack } from 'components/system';
import { TTableRenderItemObject } from 'components/custom/table/types';
import { usePagination, useSnackbar } from 'hooks';
import { ApplicationAPI } from 'api';
import { useAppContext } from 'context';
import { IApplication } from 'api/applications/types';
import Project from 'constants/project';
import { format } from 'date-fns';
import Tooltip from 'components/custom/tooltip';

const UserApplicationsPage = () => {
  const { user, applicationStatus } = useAppContext();
  const { push } = useSnackbar();
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>([]);
  const getAllApplications = async (): Promise<any> => {
    try {
      const response = await ApplicationAPI.getApplications({
        ownerId: user.id,
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
    getAllApplications()
      .then((data) => setTotalColumnItems(data))
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  }, [applicationStatus]);

  const [clearing, setClearing] = useState<boolean>(false);

  useEffect(() => {
    if (clearing) {
      getAllApplications()
        .then((data) => setTotalColumnItems(data))
        .catch((error) => push('Something went wrong!', { variant: 'error' }));
      setClearing(false);
    }
  }, [clearing]);

  const PageSize = 10;

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
    setTotalResults(totalColumnItems?.length);
  }, [totalColumnItems]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (page - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return totalColumnItems?.slice(firstPageIndex, lastPageIndex);
  }, [page, totalColumnItems, PageSize]);

  const renderItem = ({ headItem, row }: TTableRenderItemObject) => {
    const application = row.data as IApplication;
    if (headItem.reference === 'house') {
      return (
        <MarketTableItem>

          <Image
            alt="house photo"
            src={`${Project.apis.v1}/public/images/${application.house.images?.find(
              (item) => item.id === application.house.thumbnailId
            )?.key
              }`}
            width={100}
            priority={true}
            height={100}
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />

          <Tooltip title={application.house.name}>
            <EllipsisText>
              {application.house.name.length > 29
                ? application.house.name.slice(0, 29) + '...'
                : application.house.name}
            </EllipsisText>
          </Tooltip>
        </MarketTableItem>


      );
    }
    if (headItem.reference === 'theme') {
      return application.house.theme;
    }
    if (headItem.reference === 'location') {
      return application.house.location;
    }
    if (headItem.reference === 'type') {
      return application.tier;
    }
    if (headItem.reference === 'rent') {
      console.log(application.house)
      return `${application.house.currency}${application.house.rent}`;
    }
    if (headItem.reference === 'status') {
      if (application.house.status.toLowerCase() === "completed" && application.status.toLowerCase() === 'not selected') {
        return 'Not Selected'
      } else if (application.status.toLowerCase() === "Not Selected".toLowerCase()) {
        return "Applied"
      } else {
        return application.status;
      }
    }
    if (headItem.reference === 'date') {
      return format(new Date(application.createdAt), 'MM/dd/yyyy');
    }

    return '';
  };

  return (
    <ProjectsMain>
      <CardWithText title="My Applications">
        <Stack>
          <Table
            head={DApplicationsHead}
            items={currentTableData}
            renderItem={renderItem}
          />
          <Pagination
            onChange={(_e, x) => handlePageChange(x)}
            page={page}
            count={pagesCount}
          />
        </Stack>
      </CardWithText>
    </ProjectsMain>
  );
};

export default UserApplicationsPage;
