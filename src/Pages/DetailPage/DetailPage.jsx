import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import { Progress } from "antd";

function DetailPage() {
  const [movie, setMovie] = useState({});
  //useParams => lay url hien tai cua brower
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((res) => {
        console.log(res);
        setMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="container flex items-center justify-center space-x-5">
      <img src={movie.hinhAnh} width={300} alt="" />
      <h2>{movie.tenPhim}</h2>
      <Progress
        type="circle"
        percent={movie.danhGia * 10}
        format={(percent) => `${percent / 10}Diem`}
      />
    </div>
  );
}

export default DetailPage;
