import React, { useEffect, useState } from 'react';

import { PropertyCard, Tabs } from 'components/custom';
import { Stack } from 'components/system';
import { Button } from 'components/ui';
import { ProjectsMain, ProjectsGrid } from 'features/opportunities/styles';
import { useModal, useSnackbar } from 'hooks';
import { AddProjectModal } from './elements';
import { IHouse } from 'api/houses/types';
import HouseAPI from 'api/houses';
import { convertLocationToFlag } from 'utilities/converters';

const AdminMarketPage = () => {
  const [tab, setTab] = useState(0);
  const { push } = useSnackbar();

  const [addProjectModal, openAddProjectModal, closeAddProjectModal] =
    useModal(false);

  const [primaryHouses, setPrimaryHouses] = useState<IHouse[]>([]);
  const [secondaryHouses, setSecondaryHouses] = useState<IHouse[]>([]);
  const [completedHouses, setCompletedHouses] = useState<IHouse[]>([]);

  const getAllHouses = async (search: string): Promise<any> => {
    try {
      const response = await HouseAPI.getAll(search);

      if (response) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  useEffect(() => {
    const gethouses = async () => {
      switch (tab) {
        case 0:
          const primary = await getAllHouses('PRIMARY');
          setPrimaryHouses(primary);
          break;
        case 1:
          const secondary = await getAllHouses('SECONDARY');
          setSecondaryHouses(secondary);
          break;
        case 2:
          const completed = await getAllHouses('COMPLETED');
          setCompletedHouses(completed);
          break;

        default:
          break;
      }
    };
    gethouses();
  }, [tab]);

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
          {primaryHouses.map((house: IHouse) => {
            return (
              <PropertyCard
                key={house.id}
                link="/overview"
                address={house.location}
                title={house.name}
                image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
                spots={house.totalSpots}
                availableSpots={house.availableSpots}
                rent={house.rent}
                theme={house.theme}
                status={house.status}
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
                link="/overview"
                address={house.location}
                title={house.name}
                image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
                spots={house.totalSpots}
                availableSpots={house.availableSpots}
                rent={house.rent}
                theme={house.theme}
                status={house.status}
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
                link="/overview"
                address={house.location}
                title={house.name}
                image="https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg"
                spots={house.totalSpots}
                availableSpots={house.availableSpots}
                rent={house.rent}
                theme={house.theme}
                status={house.status}
                label="View"
                dropdown
              />
            );
          })}
        </ProjectsGrid>
      )}
      {addProjectModal && <AddProjectModal onClose={closeAddProjectModal} />}
    </ProjectsMain>
  );
};

export default AdminMarketPage;
