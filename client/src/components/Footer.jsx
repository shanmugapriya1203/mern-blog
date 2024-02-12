import React from 'react';
import { Footer, Icon } from 'flowbite-react'; // Importing Icon component
import { Link } from 'react-router-dom';

const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className=''>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>ByteBlogs</span>
        </Link>
        <div className='grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
          <Footer.Title title='About' />
          <Footer.LinkGroup col>
            <Footer.Link to='/about'>About Us</Footer.Link>
            <Footer.Link to='/contact'>Contact Us</Footer.Link>
          </Footer.LinkGroup>
          <div className=''>
            <Footer.Title title='Follow Us' />
            <Footer.LinkGroup>
              <Footer.Link to='https://github.com/yourgithubusername'>
                <Icon name="fab fa-github" /> Github
              </Footer.Link>
              <Footer.Link to='https://www.linkedin.com/in/yourlinkedinusername'>
                <Icon name="fab fa-linkedin" /> LinkedIn
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
