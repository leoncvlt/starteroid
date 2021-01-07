import React from "react";
import { Heading, Text, ListItem, UnorderedList, Stack } from "@chakra-ui/react";

export const PrivacyPolicyPage = ({ companyName, websiteName, websiteUrl }) => {
  return (
    <Stack shouldWrapChildren>
      <Heading as="h1" size="lg">
        Privacy Policy for {companyName}
      </Heading>

      <Text>
        At {websiteName}, accessible from {websiteUrl}, one of our main priorities is the privacy of
        our visitors. This Privacy Policy document contains types of information that is collected
        and recorded by {websiteName} and how we use it.
      </Text>

      <Text>
        If you have additional questions or require more information about our Privacy Policy, do
        not hesitate to contact us. Our Privacy Policy was generated with the help of{" "}
        <a href="https://www.gdprprivacynotice.com/">
          GDPR Privacy Policy Generator from GDPRPrivacyNotice.com
        </a>
      </Text>

      <Heading as="h2" size="md">
        General Data Protection Regulation (GDPR)
      </Heading>
      <Text>We are a Data Controller of your information.</Text>

      <Text>
        {companyName} legal basis for collecting and using the personal information described in
        this Privacy Policy depends on the Personal Information we collect and the specific context
        in which we collect the information:
      </Text>
      <UnorderedList>
        <ListItem>{companyName} needs to perform a contract with you</ListItem>
        <ListItem>You have given {companyName} permission to do so</ListItem>
        <ListItem>
          Processing your personal information is in {companyName} legitimate interests
        </ListItem>
        <ListItem>{companyName} needs to comply with the law</ListItem>
      </UnorderedList>

      <Text>
        {companyName} will retain your personal information only for as long as is necessary for the
        purposes set out in this Privacy Policy. We will retain and use your information to the
        extent necessary to comply with our legal obligations, resolve disputes, and enforce our
        policies.
      </Text>

      <Text>
        If you are a resident of the European Economic Area (EEA), you have certain data protection
        rights. If you wish to be informed what Personal Information we hold about you and if you
        want it to be removed from our systems, please contact us.
      </Text>
      <Text>In certain circumstances, you have the following data protection rights:</Text>
      <UnorderedList>
        <ListItem>
          The right to access, update or to delete the information we have on you.
        </ListItem>
        <ListItem>The right of rectification.</ListItem>
        <ListItem>The right to object.</ListItem>
        <ListItem>The right of restriction.</ListItem>
        <ListItem>The right to data portability</ListItem>
        <ListItem>The right to withdraw consent</ListItem>
      </UnorderedList>

      <Heading as="h2" size="md">
        Log Files
      </Heading>

      <Text>
        {websiteName} follows a standard procedure of using log files. These files log visitors when
        they visit websites. All hosting companies do this and a part of hosting services'
        analytics. The information collected by log files include internet protocol (IP) addresses,
        browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages,
        and possibly the number of clicks. These are not linked to any information that is
        personally identifiable. The purpose of the information is for analyzing trends,
        administering the site, tracking users' movement on the website, and gathering demographic
        information.
      </Text>

      <Heading as="h2" size="md">
        Cookies and Web Beacons
      </Heading>

      <Text>
        Like any other website, {websiteName} uses 'cookies'. These cookies are used to store
        information including visitors' preferences, and the pages on the website that the visitor
        accessed or visited. The information is used to optimize the users' experience by
        customizing our web page content based on visitors' browser type and/or other information.
      </Text>

      <Text>
        For more general information on cookies, please read{" "}
        <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.
      </Text>

      <Heading as="h2" size="md">
        Privacy Policies
      </Heading>

      <Text>
        You may consult this list to find the Privacy Policy for each of the advertising partners of{" "}
        {websiteName}.
      </Text>

      <Text>
        Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web
        Beacons that are used in their respective advertisements and links that appear on{" "}
        {websiteName}, which are sent directly to users' browser. They automatically receive your IP
        address when this occurs. These technologies are used to measure the effectiveness of their
        advertising campaigns and/or to personalize the advertising content that you see on websites
        that you visit.
      </Text>

      <Text>
        Note that {websiteName} has no access to or control over these cookies that are used by
        third-party advertisers.
      </Text>

      <Heading as="h2" size="md">
        Third Party Privacy Policies
      </Heading>

      <Text>
        {websiteName}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are
        advising you to consult the respective Privacy Policies of these third-party ad servers for
        more detailed information. It may include their practices and instructions about how to
        opt-out of certain options.{" "}
      </Text>

      <Text>
        You can choose to disable cookies through your individual browser options. To know more
        detailed information about cookie management with specific web browsers, it can be found at
        the browsers' respective websites.
      </Text>

      <Heading as="h2" size="md">
        Children's Information
      </Heading>

      <Text>
        Another part of our priority is adding protection for children while using the internet. We
        encourage parents and guardians to observe, participate in, and/or monitor and guide their
        online activity.
      </Text>

      <Text>
        {websiteName} does not knowingly collect any Personal Identifiable Information from children
        under the age of 13. If you think that your child provided this kind of information on our
        website, we strongly encourage you to contact us immediately and we will do our best efforts
        to promptly remove such information from our records.
      </Text>

      <Heading as="h2" size="md">
        Online Privacy Policy Only
      </Heading>

      <Text>
        Our Privacy Policy applies only to our online activities and is valid for visitors to our
        website with regards to the information that they shared and/or collect in {websiteName}.
        This policy is not applicable to any information collected offline or via channels other
        than this website.
      </Text>

      <Heading as="h2" size="md">
        Consent
      </Heading>

      <Text>
        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
      </Text>
    </Stack>
  );
};
