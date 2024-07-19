import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SideBar({ NAV_LINKS }) {
  const [expanded, setExpanded] = useState(false);
  const [expandedcolor, setExpandedcolor] = useState('transparent');
  const [activeItem, setActiveItem] = useState('home'); 

  const toggleSidebar = () => {
    setExpanded(!expanded);
    setExpandedcolor(expanded ? 'transparent' : 'linear-gradient(to right, #001D3D, #003566)');
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); // Atualiza o item ativo ao clicar no link
  };

  return (
    <SideBarAbsolute>
      <ToggleButton expandedcolor={expandedcolor} onClick={toggleSidebar}>
        <ArrowIcon
          src="https://firebasestorage.googleapis.com/v0/b/white-lable-528b0.appspot.com/o/assets%2Fmenu-icon-blue.png?alt=media&token=7450779f-3169-436f-9076-fa5a36540c67"
          expanded={expanded}
        />
        menu
      </ToggleButton>
      <SideBarContainer expanded={expanded}>
        <>
          <LogoContainer>
            <span>SISTEMA ADMIN</span>
          </LogoContainer>
          <NavItemsWrapper>
            <NavItemsContainer>
              {NAV_LINKS.map((link, index) => (
                <NavItem key={index} isActive={activeItem === link.name.toLowerCase()}>
                  <NavItemContent>
                    <Link to={link.path} onClick={() => handleItemClick(link.name.toLowerCase())}>
                      {link.name}
                    </Link>
                      {/* {link.name} */}

                  </NavItemContent>
                </NavItem>
              ))}
            </NavItemsContainer>
          </NavItemsWrapper>
          <NavFooter>
            <ClientPerfil >
              <PerfilFoto>

              </PerfilFoto>
              <PerfilName>

              </PerfilName>
            </ClientPerfil>
          </NavFooter>
        </>
      </SideBarContainer>
    </SideBarAbsolute>
  );
}

const SideBarAbsolute = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`;

const SideBarContainer = styled.div`
  background: linear-gradient(to right, #001D3D, #003566);
  width: ${({ expanded }) => (expanded ? "350px" : "0px")};
  height: calc(100vh - 50px);
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.5s ease;
  position: relative;
`;

const LogoContainer = styled.div`
  width: 100%;
  background: linear-gradient(to right, #001D3D, #003566);
  height: max-content;
  padding: 10px 0px 10px 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  transition: padding 0.3s ease; /* Ajuste para uma transição suave no padding */
  box-sizing: border-box;

  img {
    width: 50px;
    height: 50px;
  }

  span {
    font-size: 26px;
    color: #d6d6d6;
    font-weight: 600;
    white-space: nowrap; /* Evita que o texto quebre em várias linhas */
    cursor: pointer;
  }
`;

const ClientPerfil = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  justify-content: start;
  align-items: center;
  padding-left: 40px;
  gap: 15px;
`;

const PerfilFoto = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
    width: 100%;
  }
`;

const PerfilName = styled.div`
  span {
    font-size: 22px;
  }
`;

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 20px;
`;

const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  box-sizing: border-box;
`;

const NavItem = styled.div`
  width: 80%;
  height: 40px;
  background-color: ${({ isActive }) => isActive ? "#03071e" : "transparent"};
  border-radius: 8px;
  box-shadow: ${({ isActive }) => isActive ? "1px 1px 4px rgba(0,0,0,0.4)" : "none"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
  box-sizing: border-box;

  a {
    text-decoration: none;
    color: #d6d6d6;
    font-weight: 600;
    font-size: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: rgba(255,255,255,1);
    }
  }
`;

const NavItemContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: start;
  gap: 20px;
  padding-left: 20px;
  color: white;
`;

const NavFooter = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(to right, #001D3D, #003566);
  display: flex;
  align-items: center;
  color: #d6d6d6;
  font-size: 22px;
  justify-content: center;
  box-sizing: border-box;
  transition: .3s;

  position: absolute;
  bottom: 0;
  left: 0;
`;

const ToggleButton = styled.button`
  width: 100%;
  height: 50px;
  background: ${({ expandedcolor }) => expandedcolor};
  border: 0;
  color: #233142;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: ${({ expanded }) => (expanded ? "row" : "column")};
  align-items: center;
  justify-content: ${({ expanded }) => (expanded ? "center" : "center")};
  padding-left: ${({ expanded }) => (expanded ? "20px" : "0")};
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const ArrowIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  animation: ${({ expanded }) => expanded ? rotateAnimation : "none"} 0.3s linear forwards;
`;

const VerticalText = styled.span`
  writing-mode: vertical-lr;
  font-size: 28px;
  text-align: center;
  white-space: nowrap;
  color: rgba(0,0,0,0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(180deg);
  z-index: 1;
  display: ${({ expanded }) => (expanded ? "none" : "block")};
`;
