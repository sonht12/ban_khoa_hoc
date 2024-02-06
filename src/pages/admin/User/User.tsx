// import { useGetProductsQuery,useRemoveProductMutation } from "@/Api/productApi";
import {
  Table,
  Skeleton,
  Popconfirm,
  Alert,
  Button,
  Form,
  Select,
  Input,
  Image,
  Drawer,
  Switch,
  ConfigProvider,
  notification
} from "antd";
import "../../../css/swidth.css";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateBlockMutation } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import { useState } from "react";
import Vouche from "@/pages/admin/Voucher/vouche";
import { FaSearch } from "react-icons/fa";

type Props = {};
const User = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState({})

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [userName, setUserName] = useState<string>(""); // Sử dụng chuỗi rỗng làm giá trị mặc định
  const [userEmail, setUserEmail] = useState<string>(""); // Sử dụng chuỗi rỗng làm giá trị mặc định
  const [filteredDataSource, setFilteredDataSource] = useState<IUsers[]>([]);
  const handleSearch = () => {
    const filteredData = productUser?.filter((user: IUsers) => {
      const nameMatch = user?.name?.toLowerCase().includes(userName.toLowerCase());
      // const EmailPhone= user?.email?.toLowerCase().includes(userEmail.toLowerCase());
      return nameMatch;
    });

    setFilteredDataSource(filteredData || []);
  };

  const [form] = Form.useForm();
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 10,
    orderBy: null,
    ascending: null,
    name: null,
    phone: null,
  });
  const onFinish = (formValues: any) => {
    setFilter({
      ...filter,
      ...formValues,
      name: userName,
      // email: userEmail
    });
    handleSearch();
  };
  const handleBulkDelete = () => {
    // Kiểm tra xem có ô trống nào được chọn không
    if (checkedIds.length === 0) {
      return;
    }

    // Hiển thị xác nhận xóa hàng loạt
    Swal.fire({
      title: "Bạn Chắc Chắn Muốn Xóa Những Mục Đã Chọn?",
      text: "Bạn sẽ không thể hủy nếu đồng ý!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng Ý!",
      customClass: {
        popup: "swal2-popup swal2-modal swal2-icon-warning swal2-show",
      },
    }).then((result) => {
      if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
        // Lặp qua các ID đã chọn và xóa chúng
        checkedIds.forEach((id) => {
          removeProduct(id);
        });

        // Sau khi xóa xong, cập nhật lại danh sách checkedIds
        setCheckedIds([]);
      }
    });
  };

  const { data: productUser, isLoading, error } = useGetAllUserQuery<any>(query);
  console.log("productUser:", productUser);
  const [
    removeProduct,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useDeleteUserMutation();
  const [UpdateBlock] = useUpdateBlockMutation()
  const confirm = (id: number) => {
    Swal.fire({
      title: "Bạn Chắc Chắn Muốn Xóa chứ?",
      text: " Lưu ý : Bạn sẽ không thể hủy nếu đồng ý '!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " Đồng ý ",
      customClass: {
        popup: "swal2-popup swal2-modal swal2-icon-warning swal2-show", // Áp dụng quy tắc CSS trực tiếp
      },
    }).then((result) => {
      if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
        removeProduct(id);
      }
    });
  };
  const navigate = useNavigate()
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    if (checkedIds.includes(id)) {
      // Nếu ID đã tồn tại trong mảng, loại bỏ nó
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    } else {
      // Nếu ID không tồn tại trong mảng, thêm nó vào
      setCheckedIds([...checkedIds, id]);
    }
    console.log("đã lấy được id:", id);
  };

  const dataSource = productUser?.map(
    ({ _id, name, email, img, phoneNumber, isBlock, role }: IUsers) => ({
      key: _id,
      _id,
      name,
      img,
      email,
      phoneNumber,
      isBlock,
      role
    })
  );
  const handleBlockUser = (_id, isBlock, role) => {
    if (role == 'admin') {
      notification.warning({
        message: "Thông báo",
        description: "Không được Block đối với tài khoản Admin!",
        placement: 'top',
      });
      return
    }
    Swal.fire({
      title: isBlock != 1 ? "Bạn Chắc Chắn Muốn Block Tài Khoản Này" : "Bạn Chắc Chắn Muốn Hủy Block Tài Khoản Này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng Ý!",
      customClass: {
        popup: "swal2-popup swal2-modal swal2-icon-warning swal2-show",
      },
    }).then((result) => {
      if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
        console.log("__________", _id, isBlock);
        const block = isBlock != 1 ? 1 : 0
        UpdateBlock({ _id, isBlock: block }).then((res) => {
          console.log("____________res update", res);
          notification.success({
            message: "Thông báo",
            description: res?.message || "Cập nhật thành công",
            placement: 'top',
          });
        }
        )
      }
    });
  }
  const onChangeSearchName = (e) => {
    console.log(e.target.value);
    setQuery((prev) => {
      return { ...prev, q: e.target.value.trim() }
    })
  }
  const onChangeSearchPhone = (e) => {
    console.log(e.target.value);
    setQuery((prev) => {
      return { ...prev, phoneNumber: e.target.value.trim() }
    })
  }
  const onChangeSearchEmail = (e) => {
    console.log(e.target.value);
    setQuery((prev) => {
      return { ...prev, email: e.target.value.trim() }
    })
  }
  const onChangeSelect = (val) => {
    setQuery((prev) => {
      return { ...prev, role: val }
    })
  }
  const onChangeSelectBlock = (val) => {
    setQuery((prev) => {
      return { ...prev, isBlock: val }
    })
  }
  const handleFilter = () => {

  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img: string) => <Image src={img} alt="Ảnh" width={125} height={90} />,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thao tác",
      render: ({ key: _id, isBlock, role }: any) => {
        return (
          <>
            <div className="flex items-center justify-center mr-auto">
              <Button
                className="mr-2"
                onClick={() => {
                  showDrawer()
                  return navigate({
                    search: createSearchParams({
                      userId: _id
                    }).toString()
                  })
                }}
              >
                Gửi mã giảm giá
              </Button>
              <Switch className="swidth-container" onChange={() => handleBlockUser(_id, isBlock, role)} checked={isBlock != 1} checkedChildren="Hoạt động" unCheckedChildren="Khóa" />


              {/* <Button
                className="w-9 h-8 pl-2 ml-2"
                type='default'
                onClick={() => confirm(_id)}
              >
                <IoTrashOutline className="text-xl" />
              </Button> */}
              <Button className="w-9 h-8 pl-2 ml-2"
                type='default'>
                <Link to={`/admin/user/edit/${_id}`}>
                  <AiOutlineEdit className="text-xl" />
                </Link>
              </Button>

              {/* <label className="">
                <input
                  type="checkbox"
                  style={{}}
                  onChange={() => handleCheckboxChange(_id)}
                  className="w-6 h-6  mt-1 ml-1 checkbox-style"
                />
              </label> */}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Drawer width={700} title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <Vouche check={true} />
      </Drawer>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản Người Dùng</h2>
        {/* <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Select
            showSearch
            placeholder="Tìm Người Dùng"
            style={{ width: 200 }}
            onChange={(value) => setUserName(value)}
            value={userName}
          >
            {productUser?.slice(0, 3).map((user: IUsers) => (
              <Select.Option key={user._id} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            placeholder="nhập email"
            style={{ width: 200 }}
            onChange={(value) => setUserEmail(value)}
            value={userEmail}
          >
            {productUser?.slice(0, 3).map((user: IUsers) => (
              <Select.Option key={user._id} value={user.email}>
                {user.email}
              </Select.Option>
            ))}
          </Select>

          <Form.Item shouldUpdate>
            {() => (
              <Button htmlType="submit" className="ml-3">
                Tìm kiếm
              </Button>
            )}
          </Form.Item>
        </Form> */}
        
      </header>
      <div className="flex mb-5 mt-10">
        <div className="mr-5">
          <Input allowClear onChange={onChangeSearchName} style={{ width: 250 }}
            placeholder="Tìm kiếm user" />
        </div>
        <div className="mr-5">
          <Input allowClear onChange={onChangeSearchEmail} style={{ width: 250 }}
            placeholder="Tìm kiếm email" />
        </div>
        <div className="mr-5">
          <Input allowClear onChange={onChangeSearchPhone} style={{ width: 250 }}
            placeholder="Tìm kiếm SĐT" />
        </div>
        <div className="mr-5">
          <Select
            onChange={onChangeSelect}
            placeholder="Tìm kiếm theo role"
            style={{ width: 250 }}
            options={[
              { value: 'tất cả', label: 'Tất cả' },
              { value: 'admin', label: 'Admin' },
              { value: 'member', label: 'Khách hàng' },
            ]}
          />
        </div>
        <div className="mr-5">
          <Select
            onChange={onChangeSelectBlock}
            placeholder="Tìm kiếm theo trạng thái"
            style={{ width: 250 }}
            options={[
              { value: 'tất cả', label: 'Tất cả' },
              { value: 0, label: 'Hoạt động' },
              { value: 1, label: 'Khóa' },
            ]}
          />
        </div>
        <button onClick={handleFilter} className="bg-green-700 hover:bg-green-600 hover:text-white  text-white font-bold py-1 px-2 border border-green-600 rounded flex items-center">
          <FaSearch></FaSearch>
          <span className="ml-1 ">Tìm kiếm</span>
        </button>
      </div>
      
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table
          dataSource={
            filteredDataSource.length > 0 ? filteredDataSource : dataSource
          }
          columns={columns}
        />
      )}
    </div>
  );
};

export default User;
