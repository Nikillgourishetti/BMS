import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";


 function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
           {/* <Bookings /> */}
           <p> Bookings </p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Apply for Theater" key="2">
           <TheatresList/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
