import React, { Children, useEffect, useMemo, useState } from 'react';
import { CardWithText, NewCheckboxTable, Tabs } from 'components/custom';
import { Collapse, Grid, Stack } from 'components/system';
import { Button, Input, Label, Pagination } from 'components/ui';
import Image from 'next/image';

import {
  DAdminApplicationsHead,
  DApplicationsFilters,
} from 'features/applications/data';
import {
  MarketPageFilter,
  MarketPageFilterActions,
  ProjectsMain,
  MarketTableItem,
  MarketTableItemLabel,
} from 'features/opportunities/styles';
import { TTableRenderItemObject } from 'components/custom/table/types';
import { SlidersHorizontalIcon, VerticalDotsIcon } from 'components/svg';
import { useDebounce, useModal, usePagination, useSnackbar } from 'hooks';
import { ApplicationAPI } from 'api';
import { getLocations } from 'utilities/locations';
import { getNationalities } from 'utilities/nationalities';
import { getDiets } from 'utilities/diets';
import { convertAgeToDate, getAge } from 'utilities/birthday-age-converter';
import { IUser } from 'api/users/types';
import { getInterestsAndHobbies } from 'utilities/interests';
import { getSkillsOfOthers } from 'utilities/skillsOfOthers';
import { getHouseTheme } from 'utilities/houseTheme';
import { getFieldOfStudies } from 'utilities/fieldOfStudy';
import { getDegrees } from 'utilities/degrees';
import { getSchoolsAndUniversities } from 'utilities/schools';
import { getCompanys } from 'utilities/companys';
import { getSocialMedias } from 'utilities/socialMedias';
import { getLanguages } from 'utilities/languages';
import { IApplication } from 'api/applications/types';
import Project from 'constants/project';

const AdminApplicationsPage = () => {
  const [filter, setFilter] = useState<any>(DApplicationsFilters());
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>([]);
  const [checkedusers, setCheckedUsers] = useState<number[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [socialMedias, setSocialMedias] = useState<any[]>([]);
  const [companys, setCompanys] = useState<any[]>([]);
  const [schoolsAndUniversities, setSchoolsAndUniverisities] = useState<any[]>(
    []
  );
  const [degrees, setDegrees] = useState<any[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [skillsOfthers, setSkillsOfOthers] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);

  const [filterOpen, setFilterOpen] = useState(false);

  const [tabs, setTabs] = useState(0);
  const { push } = useSnackbar();

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
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

  const getAllApplications = async (): Promise<any> => {
    try {
      const response = await ApplicationAPI.getApplications({
        ...filter,
      });

      if (response) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      push('Something went wrong!', { variant: 'error' });
    }
  };

  const getLocationOptions = async (searchTerm: string = '') => {
    const result = getLocations(searchTerm);
    setLocations(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getNationalityOptions = async (searchTerm: string = '') => {
    const result = getNationalities(searchTerm);
    setNationalities(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getLanguageOptions = async (searchTerm: string = '') => {
    const result = getLanguages(searchTerm);
    setLanguages(
      result.map((name: string) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  };

  const getSocialMediaOptions = async (searchTerm: string = '') => {
    const result = getSocialMedias(searchTerm);
    setSocialMedias(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getCompanyOptions = async (searchTerm: string = '') => {
    const result = getCompanys(searchTerm);
    setCompanys(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getSchoolAndUniversityOptions = async (searchTerm: string = '') => {
    const result = getSchoolsAndUniversities(searchTerm);
    setSchoolsAndUniverisities(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getDegreeOptions = async (searchTerm: string = '') => {
    const result = getDegrees(searchTerm);
    setDegrees(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getFieldOfStudyOptions = async (searchTerm: string = '') => {
    const result = getFieldOfStudies(searchTerm);
    setFieldOfStudy(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getThemeOptions = async (searchTerm: string = '') => {
    const result = getHouseTheme(searchTerm);
    setThemes(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getSkillsOfOtherOptions = async (searchTerm: string = '') => {
    const result = getSkillsOfOthers(searchTerm);
    setSkillsOfOthers(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getInterestsOptions = async (searchTerm: string = '') => {
    const result = getInterestsAndHobbies(searchTerm);
    setInterests(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getDietsOptions = async (searchTerm: string = '') => {
    const result = getDiets(searchTerm);
    setDiets(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const debouncedLocation = useDebounce(getLocationOptions, 100);
  const debouncedNationalities = useDebounce(getNationalityOptions, 100);
  const debouncedLanguages = useDebounce(getLanguageOptions, 100);
  const debouncedSocialMedias = useDebounce(getSocialMediaOptions, 100);
  const debouncedCompanies = useDebounce(getCompanyOptions, 100);
  const debouncedSchools = useDebounce(getSchoolAndUniversityOptions, 100);
  const debouncedDegrees = useDebounce(getDegreeOptions, 100);
  const debouncedFieldOfStudy = useDebounce(getFieldOfStudyOptions, 100);
  const debouncedThemes = useDebounce(getThemeOptions, 100);
  const debouncedSkillsOfOthers = useDebounce(getSkillsOfOtherOptions, 100);
  const debouncedInterests = useDebounce(getInterestsOptions, 100);
  const debouncedDiets = useDebounce(getDietsOptions, 100);

  const applyFilters = () => {
    getAllApplications()
      .then((data) => {
        let users = data;
        const { minDOB, maxDOB } = convertAgeToDate(
          filter.age.min,
          filter.age.max
        );
        if (minDOB && maxDOB) {
          users = users.filter(
            (user: IUser) =>
              new Date(user.dateOfBirth) >= minDOB &&
              new Date(user.dateOfBirth) <= maxDOB
          );
        } else if (minDOB && !maxDOB) {
          users = users.filter(
            (user: IUser) => new Date(user.dateOfBirth) >= minDOB
          );
        } else if (!minDOB && maxDOB) {
          users = users.filter(
            (user: IUser) => new Date(user.dateOfBirth) <= maxDOB
          );
        }

        setTotalColumnItems(users);
      })
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  };

  useEffect(() => {
    getAllApplications()
      .then((data) => setTotalColumnItems(data))
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  }, []);

  const [clearing, setClearing] = useState<boolean>(false);
  const clearFilters = () => {
    setFilter(DApplicationsFilters());
    setClearing(true);
  };
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
    if (headItem.reference === 'name') {
      return `${application.owner.firstName} ${application.owner.lastName}`;
    }
    if (headItem.reference === 'location') {
      return application.owner.location;
    }
    if (headItem.reference === 'nationality') {
      return application.owner.nationality;
    }
    if (headItem.reference === 'age') {
      return getAge(application.owner.dateOfBirth);
    }
    if (headItem.reference === 'applications') {
      return application.owner.applicationCount;
    }
    if (headItem.reference === 'invested') {
      return `€${application.owner.invested}`;
    }
    if (headItem.reference === 'house') {
      return (
        <MarketTableItem>
          {/* <Image
            alt="house photo"
            src={`${Project.apis.v1}/public/images/${application.house.images.find(
              (item) => item.id === application.house.thumbnailId
            )?.key}`}
            width={100}
            height={100}
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          /> */}
          <MarketTableItemLabel>{application.house.name}</MarketTableItemLabel>
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
      return `€${application.house.rent}`;
    }
    if (headItem.reference === 'status') {
      return application.status;
    }

    if (headItem.reference === 'actions') {
      return <VerticalDotsIcon />;
    }

    return '';
  };

  return (
    <ProjectsMain>
      <CardWithText
        title="Applications"
        actions={Children.toArray([
          <Button
            color={filterOpen ? 'secondary' : 'default'}
            variant="contained"
            onClick={toggleFilter}
            startIcon={<SlidersHorizontalIcon width="18" height="18" />}
          >
            Filters
          </Button>,
        ])}
      >
        <Stack>
          <Collapse in={filterOpen}>
            <Stack>
              <Tabs
                tabs={['Info', 'Work Experience', 'Education', 'House']}
                value={tabs}
                onValue={setTabs}
              />
              <MarketPageFilter>
                {tabs === 0 && (
                  <Grid columns={4}>
                    <Input
                      type="text"
                      label="Search"
                      placeholder="Please Enter"
                      value={filter.search}
                      onValue={(search) => setFilter({ ...filter, search })}
                    />
                    <Input
                      type="select"
                      label="Application Type"
                      placeholder="Please Select"
                      value={filter.applicationType}
                      onValue={(applicationType) =>
                        setFilter({ ...filter, applicationType })
                      }
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
                      type="select"
                      label="Location"
                      placeholder="Please Select"
                      value={filter.location}
                      onValue={(location) => setFilter({ ...filter, location })}
                    />
                    <Input
                      type="min-max"
                      label="Invested"
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
                    <Input
                      type="min-max"
                      label="Applications"
                      value={filter.applications}
                      onValue={(applications) =>
                        setFilter({ ...filter, applications })
                      }
                    />
                    <Input
                      type="select"
                      label="Status"
                      placeholder="Please Select"
                      value={filter.status}
                      onValue={(status) => setFilter({ ...filter, status })}
                    />
                    <Stack>
                      <Label
                        style={{ color: '#7E839F', marginBottom: '-1.1rem' }}
                      >
                        Date Range
                      </Label>
                      <Stack direction="horizontal">
                        <Input
                          type="date"
                          placeholder="Please Select"
                          value={filter.dateFrom}
                          onValue={(dateFrom) =>
                            setFilter({ ...filter, dateFrom })
                          }
                        />
                        <Input
                          type="date"
                          placeholder="Please Select"
                          value={filter.dateTo}
                          onValue={(dateTo) => setFilter({ ...filter, dateTo })}
                        />
                      </Stack>
                    </Stack>
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
                <MarketPageFilterActions direction="horizontal">
                  <Button color="primary" variant="contained">
                    Filter
                  </Button>
                  <Button
                    color="default"
                    variant="contained"
                    onClick={clearFilters}
                  >
                    Clear filter
                  </Button>
                </MarketPageFilterActions>
              </MarketPageFilter>
            </Stack>
          </Collapse>
          <NewCheckboxTable
            head={DAdminApplicationsHead}
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
    </ProjectsMain>
  );
};

export default AdminApplicationsPage;
