import React, { useEffect, useState } from 'react';

import { PropertyCard, Tabs } from 'components/custom';
import { Stack } from 'components/system';
import { Button } from 'components/ui';
import { ProjectsMain, ProjectsGrid } from 'features/opportunities/styles';
import { useModal, useSnackbar } from 'hooks';
import { AddProjectModal } from './elements';
import { IHouse } from 'api/houses/types';
import HouseAPI from 'api/houses';
import { useAppContext } from 'context';

const AdminMarketPage = () => {
  const { houseStatus, user } = useAppContext();
  const [tab, setTab] = useState(0);
  const { push } = useSnackbar();

  const [addProjectModal, openAddProjectModal, closeAddProjectModal] =
    useModal(false);

  const [primaryHouses, setPrimaryHouses] = useState<IHouse[]>([]);
  const [secondaryHouses, setSecondaryHouses] = useState<IHouse[]>([]);
  const [completedHouses, setCompletedHouses] = useState<IHouse[]>([]);

  const getAllHouses = async (search: string, status: string): Promise<any> => {
    try {
      const response = await HouseAPI.getAll(search, status);

      if (response) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  const refresh = async () => {
    switch (tab) {
      case 0:
        const primary = await getAllHouses('', 'Primary');
        setPrimaryHouses(primary);
        break;
      case 1:
        const secondary = await getAllHouses('', 'Secondary');
        setSecondaryHouses(secondary);
        break;
      case 2:
        const completed = await getAllHouses('', 'Completed');
        setCompletedHouses(completed);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    refresh();
  }, [tab, houseStatus]);

  return (
    <ProjectsMain>
      <Stack
        style={{ width: '100%', justifyContent: 'space-between' }}
        direction="horizontal"
      >
        <Tabs
          value={tab}
          onValue={setTab}
          tabs={['Primary Market', 'Secondary Market', 'Completed']}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProjectModal}
        >
          Add Project
        </Button>
      </Stack>
      {tab === 0 && (
        <ProjectsGrid>
          {primaryHouses?.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link={`/houses/overview?houseId=${house.id}`}
                image={house.images.find(
                  (item) => item.id === house.thumbnailId
                )}
                house={house}
                refresh={refresh}
                label="View"
                dropdown
              />
            );
          })}
        </ProjectsGrid>
      )}
      {tab === 1 && (
        <ProjectsGrid>
          {secondaryHouses.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link={`/houses/overview?houseId=${house.id}`}
                image={house.images.find(
                  (item) => item.id === house.thumbnailId
                )}
                house={house}
                refresh={refresh}
                label="View"
                dropdown
              />
            );
          })}
        </ProjectsGrid>
      )}

      {tab === 2 && (
        <ProjectsGrid>
          {completedHouses.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link={`/houses/overview?houseId=${house.id}`}
                image={house.images.find(
                  (item) => item.id === house.thumbnailId
                )}
                house={house}
                refresh={refresh}
                label="View"
                dropdown
                completed
              />
            );
          })}
        </ProjectsGrid>
      )}
      {addProjectModal && (
        <AddProjectModal onClose={closeAddProjectModal} refresh={refresh} />
      )}
    </ProjectsMain>
  );
};

export default AdminMarketPage;
