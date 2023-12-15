import { TabPanel } from "@mui/base";
import "./People.css";
import { Table } from "keep-react";
import {
  UsersThree,
  Users,
  UserPlus,
  CaretRight,
  CloudArrowDown,
} from "phosphor-react";
import {
  IconButton,
  Button,
  LinearProgress,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import path from "../../path";
import image from "./../../static/userill.jpg";
import UserCard from "../profile/userCard";

const UserCardSkeleton = ()=>{
  return <> <div className="usercard-skelton">
              <Skeleton width={150} height={150} animation={"wave"}></Skeleton>
              <Skeleton width={140} height={20} animation={"wave"}></Skeleton>
              <Skeleton width={100} height={10} animation={"wave"}></Skeleton>
              <Skeleton width={140} height={40} animation={"wave"}></Skeleton>
            </div>
  </>
}

const PeopleJS = () => {
  const [users, setUsers] = useState(false);
  const [load, setLoad] = useState(false);
  const userDB = useSelector((s) => s.user.userDB);
  const [state, setState] = useState(0);

  const getUsers = async () => {
    setLoad(true);
    try {
      const response = await axios.get(`${path}getUser?limit=15&skip=0`);
      console.log(response);
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };

  const getFollowers = async () => {
    const followersUsername = userDB?.followers?.map((ele) => {
      return {
        username: ele,
      };
    });
    setUsers(followersUsername);
  };

  const getFollowings = async () => {
    const followersUsername = userDB?.following?.map((ele) => {
      return {
        username: ele,
      };
    });

    console.log(followersUsername);
    setUsers(followersUsername);
  };

  useEffect(() => {
    setUsers(false);
    if (state == 0) {
      getUsers();
    } else if (state == 1) {
      getFollowers();
    } else {
      getFollowings();
    }
  }, [state]);

  return (
    <>
      <div className="peoplejs">
        <div className="peopljs-category">
          <Table>
            <Table.Body>
              <Table.Row
                className={state == 0 && "active"}
                onClick={() => setState(0)}
              >
                <Table.Cell>
                  <IconButton
                    className="logo"
                    style={{
                      backgroundColor: "#e4e6eb",
                    }}
                  >
                    <UsersThree size={24}></UsersThree>
                  </IconButton>
                </Table.Cell>
                <Table.Cell
                  style={{
                    color: "black",
                    fontSize: "600",
                  }}
                >
                  {" "}
                  All Users
                </Table.Cell>
                <Table.Cell>
                  <IconButton>
                    <CaretRight size={24}></CaretRight>
                  </IconButton>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className={state == 1 && "active"}
                onClick={() => setState(1)}
              >
                <Table.Cell>
                  <IconButton
                    className="logo"
                    style={{
                      backgroundColor: "#e4e6eb",
                    }}
                  >
                    <UserPlus size={24}></UserPlus>
                  </IconButton>
                </Table.Cell>
                <Table.Cell
                  style={{
                    color: "black",
                    fontSize: "600",
                  }}
                >
                  {" "}
                  Followers
                </Table.Cell>
                <Table.Cell>
                  <IconButton>
                    <CaretRight size={24}></CaretRight>
                  </IconButton>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className={state == 2 && "active"}
                onClick={() => setState(2)}
              >
                <Table.Cell>
                  <IconButton
                    className="logo"
                    style={{
                      backgroundColor: "#e4e6eb",
                    }}
                  >
                    <Users size={24}></Users>
                  </IconButton>
                </Table.Cell>
                <Table.Cell
                  style={{
                    color: "black",
                    fontSize: "600",
                  }}
                >
                  {" "}
                  Followings
                </Table.Cell>
                <Table.Cell>
                  <IconButton>
                    <CaretRight size={24}></CaretRight>
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className="peoplejs-users">
          {load && ( <>
          <UserCardSkeleton></UserCardSkeleton>
          <UserCardSkeleton></UserCardSkeleton>
          <UserCardSkeleton></UserCardSkeleton>
          <UserCardSkeleton></UserCardSkeleton>
          <UserCardSkeleton></UserCardSkeleton>
          <UserCardSkeleton></UserCardSkeleton>
          <UserCardSkeleton></UserCardSkeleton>
          </>
          )}

          {!users && !load ? (
            <>
              <div className="centerAllChat">
                <div>
                  <img src={image}></img>
                  <p>No one Here</p>
                  {!userDB && (
                    <Link to="/login">
                      <Button variant="outlined">Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {users &&
                users?.map((user) => (
                  <UserCard username={user.username}></UserCard>
                ))}
              {(state == 0 && !load) &&(
                  <div className="centerAll">
                    <Button
                      variant="outlined"
                      startIcon={<CloudArrowDown size={18}></CloudArrowDown>}
                    >
                      Load More
                    </Button>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PeopleJS;
