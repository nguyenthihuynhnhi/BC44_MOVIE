import React, { useEffect, useState } from "react";
import { https } from "../../service/config";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
const { Meta } = Card;

function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);

  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP08")
      .then((res) => {
        console.log(res);
        setMovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let renderMovieList = () => {
    return movieArr.map(({ hinhAnh, tenPhim, maPhim }) => {
      return (
        <Card
          className="shadow-xl"
          hoverable
          style={{ width: 240 }}
          cover={
            <img className="h-60 object-cover" alt="example" src={hinhAnh} />
          }
        >
          <Meta title={tenPhim} description="www.instagram.com" />
          <NavLink
            className="w-full inline-block text-center rounded-lg p-3 bg-red-500 text-white mt-3 transition duration-500 hover:scale-75 cursor-pointer"
            to={`/detail/${maPhim}`}
          >
            Xem phim
          </NavLink>
        </Card>
      );
      //card antd
    });
  };

  return (
    <div className="container grid grid-cols-4 gap-5">{renderMovieList()}</div>
  );
}

export default ListMovie;
