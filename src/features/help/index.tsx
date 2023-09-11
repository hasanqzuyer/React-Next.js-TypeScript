import React, { useState } from 'react';
import {
  HelpPageMain,
  HelpPageContact,
  HelpPageContactContainer,
  HelpPageIconWithTextContainer,
} from 'features/help/styles';
import { Button, Input } from 'components/ui';
import { IconWithText, Tabs } from 'components/custom';
import { Stack } from 'components/system';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EnvelopeIcon,
  LocationIcon,
  PhoneCallIcon,
} from 'components/svg';
import { HelpCollapse } from 'features/help/elements';
import { useSnackbar } from 'hooks';
import { UsersAPI } from 'api';

const Topics = [
  { name: 'Application & Housing' },
  { name: 'Payments & Fees' },
  { name: 'Technical Support' },
  { name: 'Community & Policies' },
  { name: 'General Inquiries' },
];

const HelpPage = () => {
  const [tab, setTab] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');

  const initialHelpFormData = {
    topic: null,
    subject: '',
    message: '',
  };

  const [helpFormData, setHelpFormData] = useState<any>(initialHelpFormData);

  const { push } = useSnackbar();

  const topicOptions = [
    { value: 0, label: 'Account and Verification' },
    { value: 1, label: 'Payments and Earnings' },
    { value: 2, label: 'Campaigns and Surveys' },
    { value: 3, label: 'Technical Support' },
    { value: 4, label: 'Privacy and Compliance' },
    { value: 5, label: 'Donations & Affiliate Program' },
    { value: 6, label: 'Benefits' },
    { value: 7, label: 'General Inquiry' },
  ];

  const isDisabled =
    !helpFormData.topic || !helpFormData.subject || !helpFormData.message;

  const sendSupportEmail = async () => {
    const { topic, subject, message } = helpFormData;

    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    try {
      if (topic && trimmedSubject.length && trimmedMessage.length) {
        const formBody = {
          subject: trimmedSubject,
          message: trimmedMessage,
          topic: topic.label,
        };
        await UsersAPI.contactAdmin(formBody);
        push('Sucess submitting form');

        setHelpFormData(initialHelpFormData);
      }
    } catch (error) {
      push('Error sending form', { variant: 'error' });
    }
  };

  return (
    <HelpPageMain>
      <Stack>
        <Tabs
          value={tab}
          onValue={setTab}
          tabs={['Frequently Asked Questions', 'Contact us']}
        />
        {tab === 0 ? (
          <Stack>
            <HelpCollapse
              title="Why Should I Fill Out My Profile in Detail?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Completing your profile in detail is crucial for several reasons. First, it aids us in the manual screening process, ensuring that you are matched with roommates who have similar educational backgrounds, work experiences, and interests. Second, it helps us identify the type of house — whether it's an E-commerce House, Fitness House, or any other focus — that would best suit your needs and aspirations.`,
              ]}
            />
            <HelpCollapse
              title="What Are Tokens and How Do I Use Them?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Tokens serve as the in-app currency, which you'll need for applying to different types of housing projects within Brotherhood House.`,
              ]}
            />
            <HelpCollapse
              title="What Types of Applications Are Available?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `We offer four different types of applications for housing projects: Elite, Premium, Priority, and Basic.`,
              ]}
            />
            <HelpCollapse
              title="How Does the House Selection Process Work?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Once a house project is created based on user demand and preferences, members have the opportunity to apply to it.`,
              ]}
            />
            <HelpCollapse
              title="How Are Housemates Chosen?"
              openIcon={<ArrowDownIcon />}
              closeIcon={<ArrowUpIcon />}
              text={[
                `Choosing the right housemates is a carefully conducted manual process.`,
              ]}
            />
          </Stack>
        ) : (
          <HelpPageContact>
            <HelpPageContactContainer>
              <Stack>
                <h2>Write to us</h2>
                <Input
                  type="select"
                  label="Topic"
                  placeholder="Select Topic"
                  value={selectedTopic}
                  onValue={(value) => setSelectedTopic(value)}
                >
                  <option value="" disabled>
                    Select Topic
                  </option>
                  {Topics.map((topic, index) => (
                    <option key={index} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
                </Input>
                <Input
                  type="text"
                  label="Subject"
                  placeholder="Please Enter"
                  value={helpFormData.subject}
                  onValue={(subject) =>
                    setHelpFormData({ ...helpFormData, subject })
                  }
                />
                <Input
                  type="text"
                  label="Message"
                  placeholder="Please Enter"
                  value={helpFormData.message}
                  onValue={(message) =>
                    setHelpFormData({ ...helpFormData, message })
                  }
                  multiline
                />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={sendSupportEmail}
                  disabled={isDisabled}
                >
                  Send
                </Button>
              </Stack>
            </HelpPageContactContainer>
            <HelpPageContactContainer>
              <HelpPageIconWithTextContainer>
                <h2>Get in touch</h2>
                <Stack>
                  <IconWithText
                    icon={<PhoneCallIcon />}
                    link="https://calendly.com/patientsinfluence-influencer/15min"
                    title="Talk with our founder"
                    text={['Schedule a call!']}
                  />
                  <IconWithText
                    icon={<EnvelopeIcon />}
                    link="mailto:ivan@patientsinfluence.com"
                    title="Write to our founder"
                    text={['Send an email!']}
                  />
                  <IconWithText
                    icon={<LocationIcon />}
                    title="Visit Us"
                    text={['Riehenring 65, 4058 Basel Switzerland']}
                    link="https://goo.gl/maps/mbiouV7WZoXBwqJDA"
                  />
                </Stack>
              </HelpPageIconWithTextContainer>
            </HelpPageContactContainer>
          </HelpPageContact>
        )}
      </Stack>
    </HelpPageMain>
  );
};

export default HelpPage;
