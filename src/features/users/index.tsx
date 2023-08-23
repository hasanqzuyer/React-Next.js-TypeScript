import React, { Children, useState } from 'react';
import {
  FinancePageMain,
  FinancePageFilter,
  FinancePageFilterActions,
} from 'features/users/styles';
import { DUsersHead, DUsersFilters } from 'features/users/data';
import { CardWithText, NewCheckboxTable, Tabs } from 'components/custom';
import { SlidersHorizontalIcon, VerticalDotsIcon } from 'components/svg';
import { Button, Input, Pagination } from 'components/ui';
import { Grid, Stack, Collapse } from 'components/system';
import { TTableRenderItemObject } from 'components/custom/table/types';
import Link from 'next/link';

const UsersPage = () => {
  const [filter, setFilter] = useState<any>(DUsersFilters());

  const [filterOpen, setFilterOpen] = useState(false);

  const [tabs, setTabs] = useState(0);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const clearFilters = () => {
    setFilter(DUsersFilters());
  };

  const renderItem = ({ headItem }: TTableRenderItemObject) => {
    if (headItem.reference === 'name') {
      return (
        <Link
          style={{ textDecoration: 'none', color: '#4f4f4f' }}
          href="/users/overview"
        >
          Ivan Jurisic
        </Link>
      );
    }
    if (headItem.reference === 'location') {
      return 'England';
    }
    if (headItem.reference === 'nationality') {
      return 'British';
    }
    if (headItem.reference === 'age') {
      return '25';
    }
    if (headItem.reference === 'applications') {
      return '12';
    }
    if (headItem.reference === 'invested') {
      return '€25';
    }
    if (headItem.reference === 'actions') {
      return <VerticalDotsIcon />;
    }

    return '';
  };

  return (
    <FinancePageMain>
      <CardWithText
        title="Users"
        actions={Children.toArray([
          <Button
            color={filterOpen ? 'secondary' : 'default'}
            variant="contained"
            onClick={toggleFilter}
            startIcon={<SlidersHorizontalIcon width="18" height="18" />}
          >
            Filters
          </Button>,
          <Button color="default" variant="contained" onClick={() => {}}>
            Export
          </Button>,
        ])}
      >
        <Stack>
          <Collapse removeGap in={filterOpen}>
            <FinancePageFilter>
              <Tabs
                tabs={['Info', 'Work Experience', 'Education', 'House']}
                value={tabs}
                onValue={setTabs}
              />
              {tabs === 0 && (
                <Grid columns={4}>
                  <Input
                    type="text"
                    label="Search"
                    placeholder="Please Select"
                    value={filter.search}
                    onValue={(search) => setFilter({ ...filter, search })}
                  />
                  <Input
                    type="select"
                    label="Location"
                    placeholder="Please Select"
                    value={filter.location}
                    onValue={(location) => setFilter({ ...filter, location })}
                  />
                  <Input
                    type="select"
                    label="Nationality"
                    placeholder="Please Select"
                    value={filter.nationality}
                    onValue={(nationality) =>
                      setFilter({ ...filter, nationality })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Age"
                    placeholder="Please Select"
                    value={filter.age}
                    onValue={(age) => setFilter({ ...filter, age })}
                  />
                  <Input
                    type="select"
                    label="Language"
                    placeholder="Please Select"
                    value={filter.language}
                    onValue={(language) => setFilter({ ...filter, language })}
                  />
                  <Input
                    type="min-max"
                    label="Applications"
                    placeholder="Please Select"
                    value={filter.applications}
                    onValue={(applications) =>
                      setFilter({ ...filter, applications })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Invested"
                    placeholder="Please Select"
                    value={filter.invested}
                    onValue={(invested) => setFilter({ ...filter, invested })}
                  />
                  <Input
                    type="select"
                    label="Social Media"
                    placeholder="Please Select"
                    value={filter.socialMedia}
                    onValue={(socialMedia) =>
                      setFilter({ ...filter, socialMedia })
                    }
                  />
                </Grid>
              )}
              {tabs === 1 && (
                <Grid columns={4}>
                  <Input
                    type="select"
                    label="Job Title"
                    placeholder="Please Select"
                    value={filter.jobTitle}
                    onValue={(jobTitle) => setFilter({ ...filter, jobTitle })}
                  />
                  <Input
                    type="select"
                    label="Company"
                    placeholder="Please Select"
                    value={filter.company}
                    onValue={(company) => setFilter({ ...filter, company })}
                  />
                  <Input
                    type="select"
                    label="Work Experience"
                    placeholder="Please Select"
                    value={filter.workExperienceLocation}
                    onValue={(workExperienceLocation) =>
                      setFilter({ ...filter, workExperienceLocation })
                    }
                  />
                  <Input
                    type="select"
                    label="Currently Employed"
                    placeholder="Please Select"
                    value={filter.currentlyEmployed}
                    onValue={(currentlyEmployed) =>
                      setFilter({ ...filter, currentlyEmployed })
                    }
                    options={[
                      {
                        value: 0,
                        label: 'Yes',
                      },
                      {
                        value: 1,
                        label: 'No',
                      },
                    ]}
                  />
                </Grid>
              )}
              {tabs === 2 && (
                <Grid columns={4}>
                  <Input
                    type="select"
                    label="School or University"
                    placeholder="Please Select"
                    value={filter.school}
                    onValue={(school) => setFilter({ ...filter, school })}
                  />
                  <Input
                    type="select"
                    label="Degree"
                    placeholder="Please Select"
                    value={filter.degree}
                    onValue={(degree) => setFilter({ ...filter, degree })}
                  />
                  <Input
                    type="select"
                    label="Field of Study"
                    placeholder="Please Select"
                    value={filter.fieldOfStudy}
                    onValue={(fieldOfStudy) =>
                      setFilter({ ...filter, fieldOfStudy })
                    }
                  />
                </Grid>
              )}
              {tabs === 3 && (
                <Grid columns={4}>
                  <Input
                    type="select"
                    label="Theme"
                    placeholder="Please Select"
                    value={filter.theme}
                    onValue={(theme) => setFilter({ ...filter, theme })}
                  />
                  <Input
                    type="select"
                    label="Skills of Others"
                    placeholder="Please Select"
                    value={filter.skillsOfOthers}
                    onValue={(skillsOfOthers) =>
                      setFilter({ ...filter, skillsOfOthers })
                    }
                  />
                  <Input
                    type="select"
                    label="Location"
                    placeholder="Please Select"
                    value={filter.houseLocation}
                    onValue={(houseLocation) =>
                      setFilter({ ...filter, houseLocation })
                    }
                  />
                  <Input
                    type="select"
                    label="Language"
                    placeholder="Please Select"
                    value={filter.houseLanguage}
                    onValue={(houseLanguage) =>
                      setFilter({ ...filter, houseLanguage })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Monthly Rent"
                    value={filter.monthlyRent}
                    onValue={(monthlyRent) =>
                      setFilter({ ...filter, monthlyRent })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Field of Study"
                    value={filter.houseAge}
                    onValue={(houseAge) => setFilter({ ...filter, houseAge })}
                  />
                  <Input
                    type="min-max"
                    label="Tenants per House"
                    value={filter.tenantsPerHouse}
                    onValue={(tenantsPerHouse) =>
                      setFilter({ ...filter, tenantsPerHouse })
                    }
                  />
                  <Input
                    type="min-max"
                    label="Interests and Hobbies"
                    placeholder="Please Select"
                    value={filter.interestsAndHobbies}
                    onValue={(interestsAndHobbies) =>
                      setFilter({ ...filter, interestsAndHobbies })
                    }
                  />
                  <Input
                    type="select"
                    label="Diet"
                    placeholder="Please Select"
                    value={filter.diet}
                    onValue={(diet) => setFilter({ ...filter, diet })}
                  />
                </Grid>
              )}

              <FinancePageFilterActions direction="horizontal">
                <Button color="primary" variant="contained">
                  Filter
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={clearFilters}
                >
                  Clear filter
                </Button>
              </FinancePageFilterActions>
            </FinancePageFilter>
          </Collapse>
          <NewCheckboxTable
            head={DUsersHead}
            items={[
              {
                name: 'Detailed planning of the project',
                published: '01.05.2023',
                action: 'a',
              },
              {
                name: 'Detailed planning of the project',
                published: '01.05.2023',
                action: 'a',
              },
              {
                name: 'Detailed planning of the project',
                published: '01.05.2023',
                action: 'a',
              },
              {
                name: 'Detailed planning of the project',
                published: '01.05.2023',
                action: 'a',
              },
              {
                name: 'Detailed planning of the project',
                published: '01.05.2023',
                action: 'a',
              },
              {
                name: 'Detailed planning of the project',
                published: '01.05.2023',
                action: 'a',
              },
            ]}
            renderItem={renderItem}
          />
          <Pagination count={32} />
        </Stack>
      </CardWithText>
    </FinancePageMain>
  );
};

export default UsersPage;
