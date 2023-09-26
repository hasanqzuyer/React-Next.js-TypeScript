import React, { Children, useEffect, useMemo, useState } from 'react';
import { CardWithText, NewCheckboxTable, Tabs } from 'components/custom';
import { Collapse, Grid, Stack } from 'components/system';
import { Button, Input, Label, Pagination } from 'components/ui';
import * as XLSX from 'xlsx';

import {
  DAdminApplicationsHead,
  DApplicationStatues,
  DApplicationType,
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
import { SlidersHorizontalIcon } from 'components/svg';
import { useDebounce, usePagination, useModal, useSnackbar } from 'hooks';
import { ApplicationAPI, HouseAPI } from 'api';
import { getLocations } from 'utilities/locations';
import { getNationalities } from 'utilities/nationalities';
import { getDiets } from 'utilities/diets';
import { getAge } from 'utilities/birthday-age-converter';
import { getSkillsOfOthers } from 'utilities/skillsOfOthers';
import { getHouseTheme } from 'utilities/houseTheme';
import { getFieldOfStudies } from 'utilities/fieldOfStudy';
import { getDegrees } from 'utilities/degrees';
import { getSocialMedias } from 'utilities/socialMedias';
import { getLanguages } from 'utilities/languages';
import { IApplication } from 'api/applications/types';
import { useAppContext } from 'context';
import Link from 'next/link';
import ApplicationStatusActions from './elements/application-status-modal';
import { getJobTitles } from 'utilities/jobTitles';
import { birthDateSchema } from 'utilities/validators';
import { getInterestsAndHobbies } from 'utilities/interests';
import { format } from 'date-fns';
import ExportApplicationsModal from './elements/export-applications-modal';
import Tooltip from '/src/components/custom/tooltip';

const AdminApplicationsPage = () => {
  const { applicationStatus } = useAppContext();
  const [filter, setFilter] = useState<any>(DApplicationsFilters());
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>([]);
  const [checkedusers, setCheckedUsers] = useState<number[]>([]);
  const [applicationTypes, setApplicationTypes] = useState<any[]>([]);
  const [applicationStatues, setApplicationStatues] = useState<any[]>([]);
  const [jobTitles, setJobTitles] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [language, setLanguages] = useState<any[]>([]);
  const [socialMedias, setSocialMedias] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [degrees, setDegrees] = useState<any[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [skillsOfthers, setSkillsOfOthers] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);
  const [houseNames, setHouseNames] = useState<any[]>([]);

  const [filterOpen, setFilterOpen] = useState(false);

  const [tabs, setTabs] = useState(0);

  const [eModal, openEModal, closeEModal] = useModal(false);

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

  const getDietsOptions = async (searchTerm: string = '') => {
    const result = getDiets(searchTerm);
    setDiets(
      result.map((name: any) => ({
        value: name,
        label: name,
      }))
    );
  };

  const getApplicationTypes = async () => {
    setApplicationTypes(
      DApplicationType.map((type: any) => ({
        value: type.value,
        label: type.name,
      }))
    );
  };

  const getApplicationStatues = async () => {
    setApplicationStatues(
      DApplicationStatues.map((type: any) => ({
        value: type.name,
        label: type.name,
      }))
    );
  };

  const getJObTitleOptions = async (searchTerm: string = '') => {
    const result = getJobTitles(searchTerm);
    setJobTitles(
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

  const getHouseNames = async () => {
    const result = await HouseAPI.getAllHouseNames();
    setHouseNames(
      result.map((house: any) => ({
        value: house.name,
        label: house.name,
      }))
    );
  };

  const debouncedLocation = useDebounce(getLocationOptions, 100);
  const debouncedNationalities = useDebounce(getNationalityOptions, 100);
  const debouncedLanguages = useDebounce(getLanguageOptions, 100);

  useEffect(() => {
    getLocationOptions();
    getNationalityOptions();
    getLanguageOptions();
    getSocialMediaOptions();
    getDegreeOptions();
    getDietsOptions();
    getHouseNames();
    getFieldOfStudyOptions();
    getThemeOptions();
    getSkillsOfOtherOptions();
    getApplicationStatues();
    getApplicationTypes();
    getJObTitleOptions();
    getInterestsOptions();
  }, []);

  const applyFilters = () => {
    getAllApplications()
      .then((data) => {
        let applications = data;
        console.log(applications);
        const max = filter.applications.max;
        const min = filter.applications.min;

        if (max && min) {
          applications = applications.filter(
            (item: IApplication) =>
              item.owner.applicationCount >= min &&
              item.owner.applicationCount <= max
          );
        } else if (min && !max) {
          applications = applications.filter(
            (item: IApplication) => item.owner.applicationCount >= min
          );
        } else if (!min && max) {
          applications = applications.filter(
            (item: IApplication) => item.owner.applicationCount <= max
          );
        }

        setTotalColumnItems(applications);
      })
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  };

  useEffect(() => {
    getAllApplications()
      .then((data) => {
        setTotalColumnItems(data);
      })
      .catch((error) => push('Something went wrong!', { variant: 'error' }));
  }, [applicationStatus]);

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
      return (
        <Link
          style={{ textDecoration: 'none', color: '#4f4f4f' }}
          href={`/users/overview?userId=${application.owner.id}`}
        >
          {application.owner.firstName} {application.owner.lastName}
        </Link>
      );
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
          <Tooltip title={application.house.name}>
            <MarketTableItemLabel>{application.house.name.length > 20
              ? application.house.name.slice(0, 20) + '...'
              : application.house.name}
            </MarketTableItemLabel>
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
      return `€${application.house.rent}`;
    }
    if (headItem.reference === 'status') {
      return application.status;
    }
    if (headItem.reference === 'tier') {
      return application.tier;
    }
    if (headItem.reference === 'date') {
      return format(new Date(application.createdAt), 'MM/dd/yyyy');
    }

    if (headItem.reference === 'actions') {
      return (
        <ApplicationStatusActions
          applicationId={application.id}
          userId={application.ownerId}
          status={application.status}
          reload={applyFilters}
        />
      );
    }

    return '';
  };

  const handleExport = (type: string) => {
    let data: any = totalColumnItems;
    if (type !== 'all') {
      let selectedApplications: any[] = [];
      totalColumnItems.forEach((user: any) => {
        if (checkedusers.includes(user.id)) {
          selectedApplications.push(user);
        }
      });
      data = selectedApplications;
    }

    const educationTemplate = {
      createdAt: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      id: '',
      overAllGPA: '',
      ownerId: '',
      to: '',
      university: '',
      updatedAt: '',
    };

    const experienceTemplate = {
      company: '',
      createdAt: '',
      from: '',
      id: '',
      jobTitle: '',
      location: '',
      ownerId: '',
      roleDescription: '',
      stillWorkHere: '',
      to: '',
      updatedAt: '',
    };

    const flatData = data.map((d: any) => {
      const { house, owner, ...rest } = d;

      const { educations, experiences, housePreference } = owner;

      let educationObject = {};
      let experienceObject = {};
      let housePreferenceObject = {};


      [...((experiences ?? []).sort((a: any, b: any) => a.id - b.id )), ...Array(4).fill(experienceTemplate)]
        .slice(0, 4)
        .forEach((work, index) => {
          const keys = Object.keys(work);
          keys.forEach((key) => {
            experienceObject[`WE${index + 1} ${key}`] = work[key];
          });
        });

      [...((educations ?? []).sort((a: any, b: any) => a.id - b.id )), ...Array(4).fill(educationTemplate)]
        .slice(0, 4)
        .forEach((edu, index) => {
          const keys = Object.keys(edu);
          keys.forEach((key) => {
            educationObject[`ED${index + 1} ${key}`] = edu[key];
          });
        });

      (housePreference ?? []).forEach((hpref, index) => {
        const keys = Object.keys(hpref);
        keys.forEach((key) => {
          housePreferenceObject[`HP ${key}`] = hpref[key];
        });
      });

      return {
        ...rest,
        house_assigneeId: house.assigneeId,
        house_availableSpots: house.availableSpots,
        house_info: house.info,
        house_location: house.location,
        house_name: house.name,
        house_rent: house.rent,
        house_status: house.status,
        house_theme: house.theme,
        house_totalSpots: house.totalSpots,
        house_thumbnailId: house.thumbnailId,
        owner_email: owner.email,
        owner_dateOfBirth: owner.dateOfBirth,
        owner_applicationCount: owner.applicationCount,
        owner_firstName: owner.firstName,
        owner_lastName: owner.lastName,
        owner_invested: owner.invested,
        owner_language: owner.language,
        owner_location: owner.location,
        owner_nationality: owner.nationality,
        owner_profileImageUrl: owner.profileImageUrl,
        owner_role: owner.role,
        owner_skills: owner.skills,
        owner_tokenBalance: owner.tokenBalance,
        owner_verified: owner.verified,
        ...experienceObject,
        ...educationObject,
        ...housePreferenceObject,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Applications.xlsx');

    closeEModal();
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
          <Button color="default" variant="contained" onClick={openEModal}>
            Export
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
                      type="multiselect"
                      label="Application Type"
                      placeholder="Please Select"
                      value={filter.applicationType}
                      options={applicationTypes}
                      onValue={(applicationType) =>
                        setFilter({ ...filter, applicationType })
                      }
                    />
                    <Input
                      type="multiselect"
                      label="Nationality"
                      options={nationalities}
                      onSearch={debouncedNationalities}
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
                      type="multiselect"
                      label="Language"
                      placeholder="Please Select"
                      onSearch={debouncedLanguages}
                      options={language}
                      value={filter.language}
                      onValue={(language) => setFilter({ ...filter, language })}
                    />
                    <Input
                      type="multiselect"
                      label="Location"
                      placeholder="Please Select"
                      onSearch={debouncedLocation}
                      value={filter.location}
                      options={locations}
                      onValue={(location) => setFilter({ ...filter, location })}
                    />
                    <Input
                      type="min-max"
                      label="Invested"
                      value={filter.invested}
                      onValue={(invested) => setFilter({ ...filter, invested })}
                    />
                    <Input
                      type="multiselect"
                      label="Social Media"
                      placeholder="Please Select"
                      value={filter.socialMedia}
                      options={socialMedias}
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
                      type="multiselect"
                      label="Status"
                      placeholder="Please Select"
                      options={applicationStatues}
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
                          validators={[
                            {
                              message: 'Invalid Date!',
                              validator: (birthDate) => {
                                if (!birthDate) return true;
                                try {
                                  birthDateSchema.validateSync({ birthDate });
                                  return true;
                                } catch {
                                  return false;
                                }
                              },
                            },
                            {
                              message:
                                'From Date must must be less than To Date!',
                              validator: (fromDate) => {
                                if (!filter.dateTo || !fromDate) return true;
                                try {
                                  return (
                                    new Date(filter.dateTo) > new Date(fromDate)
                                  );
                                } catch {
                                  return false;
                                }
                              },
                            },
                          ]}
                        />
                        <Input
                          type="date"
                          placeholder="Please Select"
                          value={filter.dateTo}
                          onValue={(dateTo) => setFilter({ ...filter, dateTo })}
                          validators={[
                            {
                              message: 'Invalid Date!',
                              validator: (birthDate) => {
                                if (!birthDate) return true;
                                try {
                                  birthDateSchema.validateSync({ birthDate });
                                  return true;
                                } catch {
                                  return false;
                                }
                              },
                            },
                            {
                              message:
                                'To Date must must be greater than From Date!',
                              validator: (toDate) => {
                                if (!filter.dateFrom || !toDate) return true;
                                try {
                                  return (
                                    new Date(filter.dateFrom) < new Date(toDate)
                                  );
                                } catch {
                                  return false;
                                }
                              },
                            },
                          ]}
                        />
                      </Stack>
                    </Stack>
                  </Grid>
                )}
                {tabs === 1 && (
                  <Grid columns={4}>
                    <Input
                      type="multiselect"
                      label="Job Title"
                      placeholder="Please Select"
                      options={jobTitles}
                      value={filter.jobTitle}
                      onValue={(jobTitle) => setFilter({ ...filter, jobTitle })}
                    />
                    <Input
                      type="text"
                      label="Company"
                      placeholder="Please Enter"
                      value={filter.company}
                      onValue={(company) => setFilter({ ...filter, company })}
                    />
                    <Input
                      type="multiselect"
                      label="Location"
                      placeholder="Please Select"
                      onSearch={debouncedLocation}
                      value={filter.workExperienceLocation}
                      options={locations}
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
                          value: 'true',
                          label: 'Yes',
                        },
                        {
                          value: 'false',
                          label: 'No',
                        },
                      ]}
                    />
                  </Grid>
                )}
                {tabs === 2 && (
                  <Grid columns={4}>
                    <Input
                      type="text"
                      label="School or University"
                      placeholder="Please Enter"
                      value={filter.school}
                      onValue={(school) => setFilter({ ...filter, school })}
                    />
                    <Input
                      type="multiselect"
                      label="Degree"
                      placeholder="Please Select"
                      options={degrees}
                      value={filter.degree}
                      onValue={(degree) => setFilter({ ...filter, degree })}
                    />
                    <Input
                      type="multiselect"
                      label="Field of Study"
                      options={fieldOfStudy}
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
                      type="multiselect"
                      label="House"
                      placeholder="Please Select"
                      options={houseNames}
                      value={filter.house}
                      onValue={(house) => setFilter({ ...filter, house })}
                    />
                    <Input
                      type="multiselect"
                      label="Theme"
                      placeholder="Please Select"
                      options={themes}
                      value={filter.theme}
                      onValue={(theme) => setFilter({ ...filter, theme })}
                    />
                    <Input
                      type="multiselect"
                      label="Skills of Others"
                      placeholder="Please Select"
                      value={filter.skillsOfOthers}
                      options={skillsOfthers}
                      onValue={(skillsOfOthers) =>
                        setFilter({ ...filter, skillsOfOthers })
                      }
                    />
                    <Input
                      type="multiselect"
                      label="Location"
                      placeholder="Please Select"
                      onSearch={debouncedLocation}
                      options={locations}
                      value={filter.houseLocation}
                      onValue={(houseLocation) =>
                        setFilter({ ...filter, houseLocation })
                      }
                    />
                    <Input
                      type="multiselect"
                      label="Language"
                      placeholder="Please Select"
                      onSearch={debouncedLanguages}
                      options={language}
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
                      label="Age"
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
                      type="multiselect"
                      label="Interests and Hobbies"
                      placeholder="Please Select"
                      options={interests}
                      value={filter.interestsAndHobbies}
                      onValue={(interestsAndHobbies) =>
                        setFilter({ ...filter, interestsAndHobbies })
                      }
                    />
                    <Input
                      type="multiselect"
                      label="Diet"
                      options={diets}
                      placeholder="Please Select"
                      value={filter.diet}
                      onValue={(diet) => setFilter({ ...filter, diet })}
                    />
                  </Grid>
                )}
                <MarketPageFilterActions direction="horizontal">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={applyFilters}
                  >
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
      {eModal && (
        <ExportApplicationsModal
          onClose={closeEModal}
          onExport={handleExport}
        />
      )}
    </ProjectsMain>
  );
};

export default AdminApplicationsPage;
