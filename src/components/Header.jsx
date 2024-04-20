import { Dropdown, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/redux/authenticateSlice";
import { productRepository } from "../repository/productRepository";
import { SearchPopup } from "./SearchPopup";

export const Header = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.authenticate.userInfo);
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const searchProduct = async () => {
      if (searchKeyword === "") return;
      const products = await productRepository.searchProducts(searchKeyword);
      setListProduct(products.data.products.result);
    };

    searchProduct();
  }, [searchKeyword]);

  const handleLogout = async () => {
    try {
      // await authenticateRepository.logout(userInfo?.tokens?.refresh?.token);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      key: "1",
      label: <div>Profile</div>,
    },
    {
      key: "2",
      label: <div onClick={handleLogout}>Log out</div>,
    },
  ];

  return (
    <div className="header">
      <Link to={"/"} className="logo">
        Comic reading
      </Link>
      <div className="options">
        <div className={`search-input ${isSearching ? "searching" : ""}`}>
          <Input
            className="input"
            placeholder="Search products..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?keyword=${e.target.value}`);
              }
            }}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            onFocus={() => {
              setIsSearching(true);
            }}
            onBlur={() => {
              setIsSearching(false);
            }}
          />
          <SearchPopup items={listProduct} visible={isSearching} />
        </div>
      </div>
      <div className="group-btn">
        {userInfo?.username !== undefined ? (
          <Dropdown
            menu={{
              items,
            }}
          >
            <Space className="dropdown-title">{userInfo?.username}</Space>
          </Dropdown>
        ) : (
          <>
            <Link to={"/signup"} className="text-btn">
              Sign up
            </Link>
            <Link to={"/login"} className="text-btn">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
