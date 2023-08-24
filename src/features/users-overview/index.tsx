import React, { useState } from 'react';
import {
  ApplicationContainer,
  AccountHeadline,
  AccountGrid,
} from 'features/users-overview/styles';
import { Button, Input, Checkbox, Card } from 'components/ui';
import { Stack } from 'components/system';
import { AddIcon, DeleteIcon } from 'components/svg';
import { Tabs } from 'components/custom';

const OverviewPage = () => {
  const [tabs, setTabs] = useState(0);

  return (
    <Stack>
      <Tabs tabs={['Info', 'Application']} value={tabs} onValue={setTabs} />
      {tabs === 0 && (
        <Card>
          <ApplicationContainer>
            <Stack>
              <AccountHeadline>Info</AccountHeadline>
              <AccountGrid style={{ marginBottom: '36px' }}>
                <Input
                  type="text"
                  label="First Name"
                  placeholder="John"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="text"
                  label="Email"
                  placeholder="johndio@gmail.com"
                  value={null}
                  onValue={() => {}}
                />
              </AccountGrid>
              <AccountGrid>
                <Input
                  type="select"
                  label="Country of Residence"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Nationality"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="date"
                  label="Date of Birth"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Languages"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
              </AccountGrid>
            </Stack>
          </ApplicationContainer>
        </Card>
      )}
      {tabs === 1 && (
        <Card>
          <ApplicationContainer>
            <Stack>
              <AccountHeadline>Work Experience</AccountHeadline>
              <AccountGrid style={{ position: 'relative' }}>
                <Input
                  type="select"
                  label="Job Title"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Company"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Location"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Stack direction="horizontal" style={{ position: 'relative' }}>
                  <Input
                    type="date"
                    label="From"
                    placeholder="Please Select"
                    value={null}
                    onValue={() => {}}
                  />
                  <Input
                    type="date"
                    label="To"
                    placeholder="Please Select"
                    value={null}
                    onValue={() => {}}
                  />
                  <Checkbox
                    label="I still work here."
                    style={{
                      position: 'absolute',
                      right: '0',
                      bottom: '-25px',
                    }}
                  />
                </Stack>
                <Input
                  type="text"
                  label="Role Description"
                  placeholder="Please Enter"
                  value={null}
                  onValue={() => {}}
                  style={{ gridColumn: '1/3' }}
                />
                <Stack
                  style={{
                    position: 'absolute',
                    right: '36px',
                    top: '90px',
                    width: 'fit-content',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <DeleteIcon style={{ color: '#9F9FB0' }} />
                  <AddIcon style={{ color: '#9F9FB0' }} />
                </Stack>
              </AccountGrid>
              <AccountHeadline>Education</AccountHeadline>
              <AccountGrid style={{ position: 'relative' }}>
                <Input
                  type="select"
                  label="School or University"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Degree"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Field of Study"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Stack direction="horizontal">
                  <Input
                    type="date"
                    label="From"
                    placeholder="Please Select"
                    value={null}
                    onValue={() => {}}
                  />
                  <Input
                    type="date"
                    label="To"
                    placeholder="Please Select"
                    value={null}
                    onValue={() => {}}
                  />
                </Stack>
                <Input
                  type="select"
                  label="Overall GPA"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Stack
                  style={{
                    position: 'absolute',
                    right: '36px',
                    top: '90px',
                    width: 'fit-content',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <DeleteIcon style={{ color: '#9F9FB0' }} />
                  <AddIcon style={{ color: '#9F9FB0' }} />
                </Stack>
              </AccountGrid>
              <AccountHeadline>Skills</AccountHeadline>
              <AccountGrid>
                <Input
                  type="select"
                  label="Type to Add Skills"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
              </AccountGrid>
              <AccountHeadline>Social Media</AccountHeadline>
              <AccountGrid>
                <Input
                  type="text"
                  label="Instagram"
                  placeholder="Please Enter"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="text"
                  label="LinkedIn"
                  placeholder="Please Enter"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="text"
                  label="TikTok"
                  placeholder="Please Enter"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="text"
                  label="Website"
                  placeholder="Please Enter"
                  value={null}
                  onValue={() => {}}
                />
              </AccountGrid>
              <AccountHeadline>House Preferences</AccountHeadline>
              <AccountGrid>
                <Input
                  type="select"
                  label="Theme"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Skills of Others"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Location"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Language"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="min-max"
                  label="Monthly Rent"
                  value={{ min: null, max: null }}
                  onValue={() => {}}
                />
                <Input
                  type="min-max"
                  label="Age"
                  value={{ min: null, max: null }}
                  onValue={() => {}}
                />
                <Input
                  type="min-max"
                  label="Tenants per House"
                  value={{ min: null, max: null }}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Interests and Hobbies"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
                <Input
                  type="select"
                  label="Diet"
                  placeholder="Please Select"
                  value={null}
                  onValue={() => {}}
                />
              </AccountGrid>
              <AccountGrid>
                <Input
                  type="text"
                  label="Motivation"
                  placeholder="Please Enter"
                  value={null}
                  onValue={() => {}}
                  style={{ gridColumn: '1/3' }}
                />
              </AccountGrid>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '130px', alignSelf: 'flex-end' }}
              >
                Save
              </Button>
            </Stack>
          </ApplicationContainer>
        </Card>
      )}
    </Stack>
  );
};

export default OverviewPage;
