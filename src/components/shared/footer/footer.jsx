import clsx from 'clsx';
import React from 'react';

import Link from 'components/shared/link';
import Logo from 'images/logo.inline.svg';

import DiscordIcon from './images/discord.inline.svg';
import GithubIcon from './images/github.inline.svg';
import LinkedinIcon from './images/linkedin.inline.svg';
import MailIcon from './images/mail.inline.svg';
// import SlackIcon from './images/slack.inline.svg';
// import TwitterIcon from './images/twitter.inline.svg';
import ThemeSelect from './theme-select';

const linkList = [
  {
    title: 'Configu',
    links: [
      {
        name: 'Home',
        url: '/',
      },
      {
        name: 'Product',
        url: '/product',
      },
      {
        name: 'About Us',
        url: '/about',
      },
      {
        name: 'Status',
        url: 'https://status.configu.com',
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      {
        name: 'Docs',
        url: '/docs',
      },
      // {
      //   name: 'Blog',
      //   url: '/blog',
      // },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        name: 'Terms of Service',
        url: '/terms-of-service',
      },
      {
        name: 'Privacy Policy',
        url: '/privacy-policy',
      },
    ],
  },
];

const social = [
  {
    Icon: DiscordIcon,
    url: 'https://discord.gg/cjSBxnB9z8',
    hoverClass: 'hover:bg-[#5865F2] hover:border-[#5865F2]',
    caption: 'Discord',
  },
  // {
  //   Icon: SlackIcon,
  //   url: 'https://configu.slack.com',
  //   hoverClass: 'hover:bg-[#E01E5A] hover:border-[#E01E5A]',
  //   caption: 'Slack',
  // },
  {
    Icon: GithubIcon,
    url: 'https://github.com/configu',
    hoverClass:
      'hover:bg-[#0B0B0E] hover:border-[#0B0B0E] dark:hover:bg-white dark:hover:border-white',
    caption: 'Github',
  },
  // {
  //   Icon: TwitterIcon,
  //   url: '#',
  //   hoverClass: 'hover:bg-[#1EA1F1] hover:border-[#1EA1F1]',
  //   caption: 'Twitter',
  // },
  {
    Icon: LinkedinIcon,
    url: 'https://www.linkedin.com/company/configu/',
    hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    caption: 'Linkedin',
  },
  {
    Icon: MailIcon,
    url: 'mailto:support@configu.com',
    hoverClass:
      'hover:bg-[#0066F5] hover:border-[#0066F5] dark:hover:bg-[#198CFF] dark:hover:border-[#198CFF]',
    caption: 'Email us',
  },
];

const Footer = () => (
  <footer className="safe-paddings dark:bg-grey-15 dark:text-white">
    <div className="container grid grid-cols-10 grid-rows-[max-content_auto] gap-x-5 py-16 md:pt-9 md:pb-8">
      <Link className="col-span-1 row-start-1 sm:col-start-1 sm:col-end-5" to="/">
        <span className="sr-only">Configu</span>
        <Logo className="text-black dark:text-white" />
      </Link>

      <div className="relative col-start-1 row-start-3 self-end lg:col-end-3 lg:-mt-[15px] md:col-start-8 md:col-end-11 md:row-start-2 md:mt-10 md:self-start md:justify-self-end sm:col-start-5 sm:row-start-1 sm:mt-0">
        <ThemeSelect />
      </div>

      <nav className="col-start-4 col-end-8 row-start-1 row-end-4 -mt-0.5 pl-[54px] pr-[90px] xl:pr-[17%] xl:pl-[10%] lg:col-start-3 lg:col-end-9 lg:pl-[50px] lg:pr-[80px] md:col-start-1 md:row-start-2 md:row-end-3 md:mt-10 md:pr-0 md:pl-0 sm:col-end-11 sm:mt-0">
        <ul className="flex w-full justify-between lg:m-auto lg:max-w-[428px] md:m-0 md:max-w-[475px] sm:max-w-none sm:flex-wrap sm:justify-start sm:gap-x-28">
          {linkList.map(({ title, links }, idx) => (
            <li className="sm:mt-8" key={idx}>
              <span className="font-mono text-md font-semibold xl:text-base">{title}</span>
              <ul>
                {links.map((link) => (
                  <li className="mt-5 flex" key={link.name}>
                    <Link className="font-normal" to={link.url} size="sm" theme="black">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="col-start-8 col-end-11 flex justify-end gap-5 lg:col-start-9 lg:flex-wrap lg:gap-2.5 lg:justify-self-end md:col-start-8 md:flex-nowrap sm:col-start-1 sm:col-end-11 sm:row-start-3 sm:mt-8 sm:max-w-full sm:justify-self-start ">
        {social.map(({ Icon, url, hoverClass, caption }, idx) => (
          <li className="xl:h-8" key={idx}>
            <Link
              className={clsx(
                'social-icon border-px group flex h-11 w-11 items-center justify-center rounded-full border border-grey-80 transition-colors duration-200 lg:h-8 lg:w-8',
                hoverClass
              )}
              to={url}
            >
              <Icon
                className={clsx(
                  'transition-[filter] duration-200 dark:brightness-0 dark:invert xl:scale-[70%]',
                  caption === 'Github' && 'dark:group-hover:invert-0'
                )}
              />
              <span className="sr-only">{caption}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-start-9 col-end-11 row-start-2 row-end-4 justify-between self-end text-grey-40 dark:text-white lg:col-start-8 md:col-start-1 md:row-start-3 md:mt-10 md:flex md:justify-between sm:row-start-4 sm:mt-8 sm:flex-col sm:justify-start">
        <p className="text-right text-sm md:text-xs sm:text-left">
          Creative design by{' '}
          <Link
            className="text-grey-40 transition-colors duration-200 hover:text-blue-light dark:text-white"
            to="https://pixelpoint.io/"
          >
            Pixel Point
          </Link>
        </p>
        <p className="mt-3 text-right text-sm md:mt-0 md:text-xs sm:mt-3.5 sm:text-left">
          @ {new Date().getFullYear()} Configu. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
export default Footer;
