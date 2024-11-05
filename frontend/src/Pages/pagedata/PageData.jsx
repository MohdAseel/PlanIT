import React from "react";

const Pagedata = [
  //props contain sphere: (technical,sports,cultural)
  //props contain group: (clubs, guilds, competitive teams,shasthra)
  // the return contains an array of club
  {
    title: "Technical",
    data: [
      {
        title: "CFI Clubs",
        data: [
          {
            title: "AI Club",
            link: "/TAIC",
          },
          {
            title: "club 2",
            link: "/club-2",
          },
          {
            title: "club 3",
            link: "/club-3",
          },
          {
            title: "club 4",
            link: "/club-4",
          },
          {
            title: "club 5",
            link: "/club-5",
          },
          {
            title: "club 6",
            link: "/club-6",
          },
          {
            title: "club 7",
            link: "/club-7",
          },
          {
            title: "club 8",
            link: "/club-8",
          },
          {
            title: "club 9",
            link: "/club-9",
          },
          {
            title: "club 10",
            link: "/club-10",
          },
        ],
      },
      {
        title: "Guilds",
        data: [
          {
            title: "Guild 1",
            link: "/guild-1",
          },
          {
            title: "Guild 2",
            link: "/guild-2",
          },
          {
            title: "Guild 3",
            link: "/guild-3",
          },
          {
            title: "Guild 4",
            link: "/guild-4",
          },
        ],
      },
      {
        title: "Competitive teams",
        data: [
          {
            title: "Comp teams 1",
            link: "/comp-teams-1",
          },
          {
            title: "Comp teams 2",
            link: "/comp-teams-2",
          },
          {
            title: "Comp teams 3",
            link: "/comp-teams-3",
          },
          {
            title: "Comp teams 4",
            link: "/comp-teams-4",
          },
        ],
      },
      {
        title: "Shashtra",
        data: [
          {
            title: "Shashtra 1",
            link: "/shashtra-1",
          },
          {
            title: "Shashtra 2",
            link: "/shashtra-2",
          },
          {
            title: "Shashtra 3",
            link: "/shashtra-3",
          },
          {
            title: "Shashtra 4",
            link: "/shashtra-4",
          },
        ],
      },
    ],
  },
  {
    title: "Sports",
    data: [
      {
        title: "Sports Clubs",
        data: [
          {
            title: "football",
            link: "/football",
          },
          {
            title: "club 2",
            link: "/club-2",
          },
          {
            title: "club 3",
            link: "/club-3",
          },
          {
            title: "club 4",
            link: "/club-4",
          },
        ],
      },
    ],
  },
  {
    title: "Cultural",
    data: [
      {
        title: "Cultural Clubs",
        data: [
          {
            title: "club 1",
            link: "/club-1",
          },
          {
            title: "club 2",
            link: "/club-2",
          },
          {
            title: "club 3",
            link: "/club-3",
          },
          {
            title: "club 4",
            link: "/club-4",
          },
        ],
      },
    ],
  },
];

function PagedataFetcher(props) {
  const sphere = props.sphere;
  const sphereData = Pagedata.find((data) => data.title === sphere);
  if (!sphereData) {
    console.error(`Sphere "${sphere}" not found in Pagedata.`);
    return [];
  }

  if (props.group == null) {
    return sphereData.data;
  }

  const group = props.group;
  const groupData = sphereData.data.find(
    (groupData) => groupData.title === group
  );

  if (!groupData) {
    console.error(`Group "${group}" not found in sphere "${sphere}".`);
    return [];
  }

  return groupData.data;
}

export default PagedataFetcher;
