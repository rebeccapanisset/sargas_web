import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {FaUser, FaSignOutAlt,  FaAngleDown, FaAngleUp,} from 'react-icons/fa'
import { Container, Breadcrumb, Asside, SubMenu } from './styles';
import { useHistory } from 'react-router-dom';
import { useAuth } from '~/contexts/auth';


export default function Header({ title }) {
  const { user, signOut } = useAuth();
  
  const [toggleMenu, setToggleMenu]= useState(false)
  const history = useHistory()
  const menuRef = useRef(null)
  
  function handleSubmenu(){
    
    setToggleMenu(!toggleMenu)
  }

  function handleClose(e){
    if(menuRef.current && !menuRef.current.contains(e.target)){
      setToggleMenu(false)
    }
  }

  function handleSignOut() {
    if(signOut()){
      history.push('/')
    }
  }


  useEffect(() => {
      document.addEventListener('click', handleClose)
  }, [toggleMenu])

  return (
    <Container>
      <Breadcrumb>{title}</Breadcrumb>
      <Asside>
        <a onClick={handleSubmenu} ref={menuRef}>
          {user?.name} {toggleMenu ? <FaAngleUp /> : <FaAngleDown />} 
        </a>
        <SubMenu show={toggleMenu}>
          <ul>
            <li><Link to="/perfil" onClick={handleClose}><FaUser size={12}/> Perfil</Link></li>
            <li><a onClick={handleSignOut}><FaSignOutAlt size={12}/> Sair</a></li>
          </ul>
        </SubMenu>
      </Asside>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
