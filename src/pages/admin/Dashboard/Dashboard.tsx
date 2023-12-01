import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetProductsQuery } from "@/Api/productApi";
import { useGetOderMoneyQuery } from "@/Api/getOrderMany";
import { useGetOrdersQuery } from "@/Api/order";
import { Table, DatePicker, Button, Drawer, DrawerProps } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Excel } from "antd-table-saveas-excel";
import _ from "lodash";
import { RangePickerProps } from "antd/es/date-picker";
import ExcelJS from "exceljs";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import * as XLSX from "xlsx";

export const exportToExcel = (data: any, fileName: any) => {
  console.log(data, "dataa");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  const columns = Object.keys(data[0]);
  worksheet.addRow(columns);
  data.forEach((item: any) => {
    const row: any[] = [];
    columns.forEach((column) => {
      row.push(item[column]);
    });
    worksheet.addRow(row);
  });
  workbook.xlsx.writeBuffer().then((buffer: any) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();
  });
};
const Dashboard = () => {



  const [openTop, setOpenTop] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('top');

  const showDrawerTop = () => {
    setOpenTop(true);
  };

  const onCloseTop = () => {
    setOpenTop(false);
  };





  const { data: productData, isLoading } = useGetProductsQuery();
  const navigate = useNavigate();
  const [alltotal, setAltotal] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataOnDay, SetDataOmday] = useState<any[][]>([]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [loggerDate, setLoggerDate] = useState({
    startDate: "",
    endDate: "",
  });
  const { data: moneyData } = useGetOderMoneyQuery({
    startDate: loggerDate?.startDate,
    endDate: loggerDate?.endDate,
  });
  console.log(moneyData?.data?.docs, "pl");
  const [options5, setoptions5] = useState({
    page: 1,
    limit: 30,
    startDate: "",
    endDate: "",
  });
  const memoOptions = useMemo(() => {
    setoptions5((prev) => ({
      ...prev,
      startDate: loggerDate.startDate,
      endDate: loggerDate.endDate,
    }));
  }, [loggerDate]);
  useEffect(() => { }, [loggerDate, memoOptions, options5]);
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  let totalRevenue = 0;
  let arrDataOnday: any[] = [];
  const { data: orderData }: any = useGetOrdersQuery();
  let totalYear: any[] = []
  const demo = orderData?.data?.filter((items: any) => items.orderStatus == "Done")
    ?.map((item: any) => {
      totalYear.push(item)
      return Number(item.payment.paymentAmount);
    })
    .reduce((total: any, order: any) => total + order, 0);
  console.log(totalYear)
  const getDataDay = orderData?.data.filter((items: any) => items.orderStatus == "Done").map((item: any) => {
    const paymentDate = item.payment.paymentDate.split("T")[0];
    const paymentAmount = item.payment.paymentAmount;
    if (paymentDate === todayDate) {
      totalRevenue += Number(paymentAmount);
      arrDataOnday.push(item);
    }
    return {
      paymentDate,
      paymentAmount,
    };
  });
  useEffect(() => {
    const dataDay = [
      ...arrDataOnday.map((items: any) => [
        items?.course?.name,
        items?.course?.price,
        items?.user?.name,
      ]),
    ];
    SetDataOmday([...dataDay]);
  }, []);
  console.log(arrDataOnday, "lol");
  const [dataFreeChart, setDataFreeChart] = useState(0);
  const [dataChart, setDataChart] = useState(0);
  const [courseNames, setCourseNames] = useState<any>([]);
  const [courseRevenues, setCourseRevenues] = useState<any>([]);
  const [courseRevenuesMonth, setCourseRevenuesMonth] = useState(false);

  const processRevenueData = (data) => {
    return Object.keys(data).map((year) => {
      const monthlyRevenues = Object.values(data[year]).map((month: any) => {
        if (
          typeof month == "object" &&
          month.hasOwnProperty("$numberDecimal")
        ) {
          return parseFloat(month["$numberDecimal"]);
        }
        return month.$numberDecimal;
      });
      return {
        name: year,
        data: monthlyRevenues,
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8088/api/revenue");
        const processedData = processRevenueData(data);
        setCourseRevenues(courseRevenues);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (productData && productData.data && orderData && orderData.data) {
      const courseNames = productData.data.map((course) => course.name);
      const courseRevenues: any = courseNames.map((courseName) => {
        const courseOrders: any = orderData.data?.filter(
          (order: any) => order.course?.name === courseName
        );
        const revenue = courseOrders
          .map((dataa: any) => {
            return Number(dataa.course.price);
          })
          .reduce((total: any, order: any) => total + order, 0);
        return revenue;
      });
      setCourseNames(courseNames);
      setCourseRevenues(courseRevenues);
    }
  }, [productData, orderData]);

  useEffect(() => {
    if (productData && productData.data) {
      const freeCourses = productData.data.filter(
        (data) => data.price === "0"
      ).length;
      const paidCourses = productData.data.filter(
        (data) => data.price !== "0"
      ).length;
      setDataFreeChart(freeCourses);
      setDataChart(paidCourses);
    }
  }, [productData]);
  const calculateNewCoursesByMonth = () => {
    if (productData && productData.data) {
      const courses = productData.data;
      const newCoursesByMonth: any = {};
      courses.forEach((course) => {
        const createdAt = new Date(course.createdAt);
        const monthKey = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1
          }`;
        if (!newCoursesByMonth[monthKey]) {
          newCoursesByMonth[monthKey] = [course.name]; // Lưu tên khoá học trong một mảng
        } else {
          newCoursesByMonth[monthKey].push(course.name);
        }
      });
      return newCoursesByMonth;
    }
    return {};
  };
  const newCoursesByMonth = calculateNewCoursesByMonth();
  const chartData2 = Object.keys(newCoursesByMonth).map((month) => ({
    name: month,
    y: newCoursesByMonth[month].length,
    courses: newCoursesByMonth[month].map((courseName: any) => ({
      name: courseName,
      quantity: 1,
    })),
  }));
  const options2 = {
    chart: {
      type: "column",
    },
    title: {
      text: "Khoá Học Mới Nhất Theo Tháng",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số Lượng",
      },
    },
    series: [
      {
        name: "Số Lượng",
        colorByPoint: true,
        data: chartData2,
      },
    ],
  };
  const chartData = [
    { name: "Khoá Học Trả Phí", y: dataChart },
    { name: "Khoá Học Miễn Phí", y: dataFreeChart },
  ];
  const columnOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Doanh Thu Từng Khóa Học",
    },
    xAxis: {
      categories: courseNames,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Doanh Thu",
      },
    },
    series: [
      {
        name: "Doanh Thu",
        data: courseRevenues,
      },
    ],
  };
  const columnOptions3 = {
    chart: {
      type: "column",
    },
    title: {
      text: "Doanh Thu Theo Tháng",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Doanh Thu",
      },
    },
    series: courseRevenues,
  };
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Biểu Đồ Thống Kê Khóa Học",
    },
    series: [
      {
        name: "Số Lượng",
        colorByPoint: true,
        data: chartData,
      },
    ],
  };
  const columns = [
    {
      title: "Thời Gian Mua",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text: any) => {
        const db = text.split("T");
        return <p>{db[0]}</p>;
      },
    },
    {
      title: "Tên Khoá Học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Giá Tiền",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (text: any) => `$${text}`,
    },
    {
      title: "Tên Người Mua",
      dataIndex: "userName",
      key: "userName",
    },
  ];
  const data = orderData
    ? orderData.data
      .map((order: any, index: any) => ({
        key: index,
        orderDate: order.orderDate,
        courseName: order.couser?.name,
        paymentAmount: order.payment.paymentAmount,
        userName: order.user?.name,
      }))
      .sort((a: any, b: any) => new Date(b.orderDate) - new Date(a.orderDate))
    : [];
  const onDateChange: RangePickerProps["onChange"] = (_, dateString) => {
    setLoggerDate({ startDate: dateString[0], endDate: dateString[1] });
    navigate({
      search: createSearchParams({
        startDate: dateString[0],
        endDate: dateString[1],
      }).toString(),
    });
  };
  console.log(moneyData?.data?.docs)
  let total = moneyData?.data?.docs.filter((items: any) => items.orderStatus == "Done").reduce((sum, item) => {
    return sum + Number(item?.payment?.paymentAmount || 0);
  }, 0);
  console.log(total)
  const dataSourceMoney = moneyData?.data?.docs.map(
    ({ orderStatus, payment, orderDate }: any, index: number) => ({
      key: index + 1,
      orderStatus: orderStatus,
      payment: payment,
      orderDate: orderDate,
    })
  );
  const dataSourceMoneyDymanic = moneyData?.data?.docs.map(
    (items: any, index: number) => ({
      key: index + 1,
      name: items?.course?.name,
      price: items?.payment?.paymentAmount,
      user: items?.user?.name,
    })
  );
  const columnsMoney = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "orderStatus",
      dataIndex: "orderStatus",
      key: "logType",
      render: (text: string) => {
        console.log(text);
        let colorType = "";
        if (text.toLowerCase() == "update") {
          colorType = "text-warning font-bold text-md";
        } else if (text.toLowerCase() == "create") {
          colorType = "text-success font-bold text-md";
        } else if (text.toLowerCase() == "delete") {
          colorType = "text-danger font-bold text-md";
        }
        return <p className={colorType}>{text}</p>;
      },
    },
    {
      title: "payment",
      dataIndex: "payment",
      key: "payment",
      render: (data: any) => {
        console.log(data);
        return <p>{data.paymentMethod}</p>;
      },
    },
    {
      title: "moeny",
      dataIndex: "payment",
      key: "payment",
      render: (data: any) => {
        console.log(data);
        return <p>{data.paymentAmount}</p>;
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (data: string) => {
        return <p>{data.split("T")[0]}</p>;
      },
    },
  ];
  const dataSourceTotalDay =
    arrDataOnday &&
    arrDataOnday.map((items: any) => ({
      key: items._id,
      name: items?.course?.name,
      price: items?.course?.price,
      user: items?.user?.name,
    }));

  const dataSourceYear =
    totalYear &&
    totalYear?.map((items: any) => ({
      key: items._id,
      name: items?.course?.name,
      price: items?.course?.price,
      user: items?.user?.name,
    }));
  console.log(totalYear)
  const columnsToTalDay = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "user",
      dataIndex: "user",
      key: "user",
    },
    {
      render: ({ key: id }: { key: string }) => {
        return <Link to={`/admin/orders/${id}`} >view</Link>;
      },
    },
  ];

  return (
    <div>
      <>



        <Drawer
          title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={onCloseTop}
          open={openTop}
          key={placement}
        >
          <div>
            <Button
              onClick={() => exportToExcel(totalYear, "all")}
              className="mb-5"
            >
              export Excel all
            </Button>
            <Table
              dataSource={dataSourceYear}
              columns={columnsToTalDay}
            />
          </div>
        </Drawer>




        <Drawer
          title="Basic Drawer"
          width={800}
          placement="right"
          onClose={onClose}
          open={open}
        >
          {alltotal ? (
            <>
              <Button
                onClick={() => exportToExcel(arrDataOnday, "test")}
                className="mb-5"
              >
                export Excel day
              </Button>
              <Table
                dataSource={dataSourceTotalDay}
                columns={columnsToTalDay}
              />
            </>
          ) : (
            <div>
              <Button
                onClick={() => exportToExcel(moneyData?.data?.docs, "all")}
                className="mb-5"
              >
                export Excel all
              </Button>
              <Table
                dataSource={dataSourceMoneyDymanic}
                columns={columnsToTalDay}
              />
            </div>
            //
          )}
        </Drawer>
      </>
      {courseRevenuesMonth ? (
        <div>..... loading</div>
      ) : (
        <div>
          <div>
            <DatePicker.RangePicker onChange={onDateChange} />
            <p>Doanh thu date time là ${total} </p>
            <p
              onClick={() => {
                showDrawer();
                setAltotal(false);
              }}
              className="text-green-500 font-bold"
            >
              View CHi TIết
            </p>
            <div>
              <p>Đơn hàng theo lịch </p>
              <Table
                className="mt-5"
                dataSource={dataSourceMoney}
                columns={columnsMoney}
                pagination={false}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="rounded-md border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-title-md dark:text-white font-bold text-black">
                    Doanh Thu TỔng
                  </h4>
                </div>
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                  <img className="w-[60px]" src={""} />
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <h4 className="text-title-md dark:text-white font-bold text-black">
                    {demo?.toLocaleString()}
                  </h4>
                  <p onClick={showDrawerTop} className="text-sm pt-2 font-medium underline">
                    Total views
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-title-md dark:text-white font-bold text-black">
                    Doanh Thu theo năm
                  </h4>
                </div>
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                  <img className="w-[60px]" src={""} />
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <h4 className="text-title-md dark:text-white font-bold text-black">
                    {demo?.toLocaleString()}
                  </h4>
                  <p onClick={showDrawerTop} className="text-sm pt-2 font-medium underline">
                    Total views
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-title-md dark:text-white font-bold text-black">
                    Doanh Thu hôm nay
                  </h4>
                </div>
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                  <img className="w-[60px]" src={""} />
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <h4 className="text-title-md dark:text-white font-bold text-black">
                    {totalRevenue?.toLocaleString()}
                  </h4>
                  <p
                    onClick={() => {
                      showDrawer();
                      setAltotal(true);
                    }}
                    className="text-sm pt-2 font-medium underline cursor-pointer"
                  >
                    Total views
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <HighchartsReact highcharts={Highcharts} options={columnOptions} />
          {/* theo thang */}
          {/* <HighchartsReact highcharts={Highcharts} options={columnOptions3} /> */}
          {/*  */}
          <HighchartsReact highcharts={Highcharts} options={options2} />
          <div>
            <h2>Thống Kê Người Mua Gần Nhất</h2>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
