import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";

import { Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};

function TabsMovie() {
  const [heThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    https
      .get(
        "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap?maNhom=GP01"
      )
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let renderHeThongRap = () => {
    return heThongRap.map((heThong, index) => {
      return {
        key: index,
        label: <img className="w-20" src={heThong.logo} alt="" />,
        children: `Content of Tab Pane 1`,
      };
    });
  };

  return (
    <div className="container pb-96">
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={renderHeThongRap()}
        onChange={onChange}
      />
    </div>
  );
}

export default TabsMovie;
