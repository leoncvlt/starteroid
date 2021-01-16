import React from "react";
import { Heading, Text, Link, ListItem, UnorderedList, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

//from https://www.termsandconditionsgenerator.com/
export const TermsAndConditionsPage = ({ companyName, websiteName, websiteUrl }) => {
  return (
    <Stack shouldWrapChildren>
      <Heading as="h1" size="lg">
        <strong>Terms and Conditions</strong>
      </Heading>

      <Text>Welcome to {websiteName}!</Text>

      <Text>
        These terms and conditions outline the rules and regulations for the use of {companyName}'s
        Website, located at {websiteUrl}.
      </Text>

      <Text>
        By accessing this website we assume you accept these terms and conditions. Do not continue
        to use {websiteName} if you do not agree to take all of the terms and conditions stated on
        this page.
      </Text>

      <Text>
        The following terminology applies to these Terms and Conditions, Privacy Statement and
        Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person
        log on this website and compliant to the Company’s terms and conditions. "The Company",
        "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
        refers to both the Client and ourselves. All terms refer to the offer, acceptance and
        consideration of payment necessary to undertake the process of our assistance to the Client
        in the most appropriate manner for the express purpose of meeting the Client’s needs in
        respect of provision of the Company’s stated services, in accordance with and subject to,
        prevailing law of Netherlands. Any use of the above terminology or other words in the
        singular, plural, capitalization and/or he/she or they, are taken as interchangeable and
        therefore as referring to same.
      </Text>

      <Heading as="h2" size="md">
        <strong>Cookies</strong>
      </Heading>

      <Text>
        We employ the use of cookies. By accessing {websiteName}, you agreed to use cookies in
        agreement with the {companyName}'s Privacy Policy.{" "}
      </Text>

      <Text>
        Most interactive websites use cookies to let us retrieve the user’s details for each visit.
        Cookies are used by our website to enable the functionality of certain areas to make it
        easier for people visiting our website. Some of our affiliate/advertising partners may also
        use cookies.
      </Text>

      <Heading as="h2" size="md">
        <strong>License</strong>
      </Heading>

      <Text>
        Unless otherwise stated, {companyName} and/or its licensors own the intellectual property
        rights for all material on {websiteName}. All intellectual property rights are reserved. You
        may access this from {websiteName} for your own personal use subjected to restrictions set
        in these terms and conditions.
      </Text>

      <Text>You must not:</Text>
      <UnorderedList>
        <ListItem>Republish material from {websiteName}</ListItem>
        <ListItem>Sell, rent or sub-license material from {websiteName}</ListItem>
        <ListItem>Reproduce, duplicate or copy material from {websiteName}</ListItem>
        <ListItem>Redistribute content from {websiteName}</ListItem>
      </UnorderedList>

      <Text>
        This Agreement shall begin on the date hereof. Our Terms and Conditions were created with
        the help of the{" "}
        <a href="https://www.termsandconditionsgenerator.com">Terms And Conditions Generator</a> and
        the <a href="https://www.generateprivacypolicy.com">Privacy Policy Generator</a>.
      </Text>

      <Text>
        Parts of this website offer an opportunity for users to post and exchange opinions and
        information in certain areas of the website. {companyName} does not filter, edit, publish or
        review Comments prior to their presence on the website. Comments do not reflect the views
        and opinions of {companyName},its agents and/or affiliates. Comments reflect the views and
        opinions of the person who post their views and opinions. To the extent permitted by
        applicable laws, {companyName} shall not be liable for the Comments or for any liability,
        damages or expenses caused and/or suffered as a result of any use of and/or posting of
        and/or appearance of the Comments on this website.
      </Text>

      <Text>
        {companyName} reserves the right to monitor all Comments and to remove any Comments which
        can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
      </Text>

      <Text>You warrant and represent that:</Text>

      <UnorderedList>
        <ListItem>
          You are entitled to post the Comments on our website and have all necessary licenses and
          consents to do so;
        </ListItem>
        <ListItem>
          The Comments do not invade any intellectual property right, including without limitation
          copyright, patent or trademark of any third party;
        </ListItem>
        <ListItem>
          The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise
          unlawful material which is an invasion of privacy
        </ListItem>
        <ListItem>
          The Comments will not be used to solicit or promote business or custom or present
          commercial activities or unlawful activity.
        </ListItem>
      </UnorderedList>

      <Text>
        You hereby grant {companyName} a non-exclusive license to use, reproduce, edit and authorize
        others to use, reproduce and edit any of your Comments in any and all forms, formats or
        media.
      </Text>

      <Heading as="h2" size="md">
        <strong>Hyperlinking to our Content</strong>
      </Heading>

      <Text>
        The following organizations may link to our Website without prior written approval:
      </Text>

      <UnorderedList>
        <ListItem>Government agencies;</ListItem>
        <ListItem>Search engines;</ListItem>
        <ListItem>News organizations;</ListItem>
        <ListItem>
          Online directory distributors may link to our Website in the same manner as they hyperlink
          to the Websites of other listed businesses; and
        </ListItem>
        <ListItem>
          System wide Accredited Businesses except soliciting non-profit organizations, charity
          shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
        </ListItem>
      </UnorderedList>

      <Text>
        These organizations may link to our home page, to publications or to other Website
        information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply
        sponsorship, endorsement or approval of the linking party and its products and/or services;
        and (c) fits within the context of the linking party’s site.
      </Text>

      <Text>
        We may consider and approve other link requests from the following types of organizations:
      </Text>

      <UnorderedList>
        <ListItem>commonly-known consumer and/or business information sources;</ListItem>
        <ListItem>dot.com community sites;</ListItem>
        <ListItem>associations or other groups representing charities;</ListItem>
        <ListItem>online directory distributors;</ListItem>
        <ListItem>internet portals;</ListItem>
        <ListItem>accounting, law and consulting firms; and</ListItem>
        <ListItem>educational institutions and trade associations.</ListItem>
      </UnorderedList>

      <Text>
        We will approve link requests from these organizations if we decide that: (a) the link would
        not make us look unfavorably to ourselves or to our accredited businesses; (b) the
        organization does not have any negative records with us; (c) the benefit to us from the
        visibility of the hyperlink compensates the absence of {companyName}; and (d) the link is in
        the context of general resource information.
      </Text>

      <Text>
        These organizations may link to our home page so long as the link: (a) is not in any way
        deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking
        party and its products or services; and (c) fits within the context of the linking party’s
        site.
      </Text>

      <Text>
        If you are one of the organizations listed in paragraph 2 above and are interested in
        linking to our website, you must inform us by sending an e-mail to {companyName}. Please
        include your name, your organization name, contact information as well as the URL of your
        site, a list of any URLs from which you intend to link to our Website, and a list of the
        URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
      </Text>

      <Text>Approved organizations may hyperlink to our Website as follows:</Text>

      <UnorderedList>
        <ListItem>By use of our corporate name; or</ListItem>
        <ListItem>By use of the uniform resource locator being linked to; or</ListItem>
        <ListItem>
          By use of any other description of our Website being linked to that makes sense within the
          context and format of content on the linking party’s site.
        </ListItem>
      </UnorderedList>

      <Text>
        No use of {companyName}'s logo or other artwork will be allowed for linking absent a
        trademark license agreement.
      </Text>

      <Heading as="h2" size="md">
        <strong>iFrames</strong>
      </Heading>

      <Text>
        Without prior approval and written permission, you may not create frames around our Webpages
        that alter in any way the visual presentation or appearance of our Website.
      </Text>

      <Heading as="h2" size="md">
        <strong>Content Liability</strong>
      </Heading>

      <Text>
        We shall not be hold responsible for any content that appears on your Website. You agree to
        protect and defend us against all claims that is rising on your Website. No link(s) should
        appear on any Website that may be interpreted as libelous, obscene or criminal, or which
        infringes, otherwise violates, or advocates the infringement or other violation of, any
        third party rights.
      </Text>

      <Heading as="h2" size="md">
        <strong>Your Privacy</strong>
      </Heading>

      <Text>
        Please read our{" "}
        <Link as={RouterLink} to="/privacy-policy" color="blue.500" isExternal>
          privacy policy
        </Link>
      </Text>

      <Heading as="h2" size="md">
        <strong>Reservation of Rights</strong>
      </Heading>

      <Text>
        We reserve the right to request that you remove all links or any particular link to our
        Website. You approve to immediately remove all links to our Website upon request. We also
        reserve the right to amen these terms and conditions and it’s linking policy at any time. By
        continuously linking to our Website, you agree to be bound to and follow these linking terms
        and conditions.
      </Text>

      <Heading as="h2" size="md">
        <strong>Removal of links from our website</strong>
      </Heading>

      <Text>
        If you find any link on our Website that is offensive for any reason, you are free to
        contact and inform us any moment. We will consider requests to remove links but we are not
        obligated to or so or to respond to you directly.
      </Text>

      <Text>
        We do not ensure that the information on this website is correct, we do not warrant its
        completeness or accuracy; nor do we promise to ensure that the website remains available or
        that the material on the website is kept up to date.
      </Text>

      <Heading as="h2" size="md">
        <strong>Disclaimer</strong>
      </Heading>

      <Text>
        To the maximum extent permitted by applicable law, we exclude all representations,
        warranties and conditions relating to our website and the use of this website. Nothing in
        this disclaimer will:
      </Text>

      <UnorderedList>
        <ListItem>limit or exclude our or your liability for death or personal injury;</ListItem>
        <ListItem>
          limit or exclude our or your liability for fraud or fraudulent misrepresentation;
        </ListItem>
        <ListItem>
          limit any of our or your liabilities in any way that is not permitted under applicable
          law; or
        </ListItem>
        <ListItem>
          exclude any of our or your liabilities that may not be excluded under applicable law.
        </ListItem>
      </UnorderedList>

      <Text>
        The limitations and prohibitions of liability set in this Section and elsewhere in this
        disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
        arising under the disclaimer, including liabilities arising in contract, in tort and for
        breach of statutory duty.
      </Text>

      <Text>
        As long as the website and the information and services on the website are provided free of
        charge, we will not be liable for any loss or damage of any nature.
      </Text>
    </Stack>
  );
};
