import React from 'react';
import { Footer } from 'flowbite-react'; // Importing Icon component
import { Link } from 'react-router-dom';

const FooterCom = () => {
  return (
    <Footer container className='border border-t-8'>
      <div className=''>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className="text-indigo-950 font-bold uppercase"  style={{ fontFamily: "'Roboto', sans-serif" }}>Byte&nbsp;Blog</span>

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
                Github
              </Footer.Link>
              <Footer.Link to='https://www.linkedin.com/in/yourlinkedinusername'>
              LinkedIn
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
