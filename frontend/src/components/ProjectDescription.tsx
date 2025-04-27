import React from 'react';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const ProjectDescription: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Project Overview</Title>
      <Paragraph>
        Hello! During the development of this task, I focused on understanding the problem and figuring out how to solve it. I imagined myself as an investor and considered what would be important for me. As a result, I created three pages:
      </Paragraph>

      <Card title="Dashboard" bordered={false}>
        <Paragraph>
          This page provides general information about organizations, including key indicators such as total funding amount, the number of rounds, and other important data.
        </Paragraph>
      </Card>

      <Card title="Organizations Page" bordered={false}>
        <Paragraph>
          This page displays a table with organizations, where you can sort and filter data by key indicators, such as funding amount or number of rounds. When clicking on an organization, the user is taken to a detailed page for that organization, where they can see a timeline of funding rounds, overall statistics, and a company description. This allows the investor to understand the dynamics of the company's development in more detail. I also want to add search functionality by company name and the ability to select multiple organizations for comparison.
        </Paragraph>
      </Card>

      <Card title="Organizations funding Page" bordered={false}>
        <Paragraph>
          This page shows detailed information about each funding round of an organization, including indicators such as the minimum, maximum, and average funding amounts, as well as the dates of the first and last rounds. This will help investors assess the company's development history and understand how investor activity has changed over time.
        </Paragraph>
      </Card>

      <Divider />

      <Title level={3}>Additional Features and Improvements</Title>
      <Paragraph>
        Additionally, during development, I realized that several additional features could be implemented on these pages. For example:
      </Paragraph>
      <ul>
        <li>Search by name in the organization table to help users quickly find specific companies.</li>
        <li>Comparing multiple organizations to allow investors to compare key indicators.</li>
        <li>Navigation to /organization/ a filtered table when clicking on a section of the chart, for a deeper analysis of the selected data.</li>
      </ul>

      <Divider />

      <Title level={3}>What Was Done</Title>
      <Paragraph>
        What has been done so far is just a small part of what can be added. For example, I would like to improve data visualization and make the interface more interactive. In the future, additional metrics and indicators can be integrated to better meet user needs.
      </Paragraph>

      <Card title="Application Architecture" bordered={false}>
        <Paragraph>
          Modularity and clean code — I made sure that each component and part of the system remains independent and easily reusable.
        </Paragraph>
      </Card>

      <Card title="What Was Not Done" bordered={false}>
        <Paragraph>
          <ul>
            <li><strong>Security:</strong> I didn’t have time to implement protection from attacks such as Rate Limiting, CSP, and other security measures. However, I understand the importance of these mechanisms.</li>
          </ul>
        </Paragraph>
      </Card>

      <Card title="What Was Done" bordered={false}>
        <Paragraph>
          <ul>
            <li><strong>Data processing and presentation:</strong> I focused on collecting and processing data correctly for display. For example, when displaying funding statistics, I used aggregated data (maximum and minimum round amounts, average values, etc.) to help investors quickly navigate the information.</li>
            <li><strong>Data visualization:</strong> I used the Recharts library for charts and diagrams to flexibly and beautifully visualize the data.</li>
            <li><strong>User interface:</strong> I focused on creating a user-friendly interface.</li>
            <li><strong>Error handling and exceptions:</strong> In case of an error in the application, a message is shown instead of a white screen. All errors are handled at the UI level.</li>
            <li><strong>Preloader:</strong> I used a preloader when loading data or transitioning between pages. This improves the user experience by preventing a white screen and makes interactions smoother and more comfortable.</li>
          </ul>
        </Paragraph>
      </Card>
    </div>
  );
};

export default ProjectDescription;
