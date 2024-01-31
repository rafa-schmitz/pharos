import { useState } from 'react'
import './styles.css'
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { VscAccount } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'

export const MenuDropdown = () => {
  const { isAuthenticated, handleLogout, user } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isAuthenticated ?
        <Menu
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          <MenuButton
            width={[160, 200]}
            _hover={{ background: "none" }}
            _active={{ background: "none" }}
            background="transparent"
            color="#fff"
            style={{ textAlign: "left", whiteSpace: "break-spaces" }}
            as={Button}
            leftIcon={<Avatar width={10} height={10} name={user.username} src={user?.photo?.url || ""} />}
            rightIcon={isOpen ? <ChevronUpIcon boxSize={5} /> : <ChevronDownIcon boxSize={5} />}
            iconSpacing={"10px"}
          >
            {"Olá,\n" + user?.name || user.username}
          </MenuButton>
          <MenuList>
            <MenuItem color={"#000"} minH='40px' gap={"10px"} _hover={{ background: "#490CB0", color: "#fff" }}>
              <VscAccount size={20} />
              <Link to={"/profile"}>Minha conta</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout} color={"#000"} minH='40px' gap={"10px"} _hover={{ background: "#490CB0", color: "#fff" }}>
              <BiLogOut size={20} />
              <span>Logout</span>
            </MenuItem>
          </MenuList>
        </Menu>
        :
        <Button
          borderRadius="24px"
          padding="10px 40px"
          color="#fff"
          transition="all 0.5s"
          backgroundPosition="0%"
          backgroundSize="500% 500%"
          overflow="hidden"
          border="1px solid #fff"
          background="linear-gradient( 345deg, #fff 0%, #fff 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100% )"
          _hover={{ backgroundPosition: "99% 50%", color: "#0D0221" }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      }
    </>
  )
}