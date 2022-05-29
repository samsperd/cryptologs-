import { Button, Col, Divider, Row, Typography } from 'antd';
import React from 'react'

const { Title, Text } = Typography;

function filterArray(item) {
  let links = [];

  if (item) {
    if (item.length > 0) {
      for (let index = 0; index < item.length; index++) {
        if (item[index] !== "") {
          links.push(item[index]);
        }
      }
      return links;
    }
  }
}


const CryptoLinks = ({ links }) => {
  return (
    <>
              {
                links.homepage &&
                  links.homepage.length > 0 &&
                    filterArray(links.homepage).length > 0 && 
                      <>
                        <Row className='coin-link'>
                              <Col span={12}>
                                <Title level={5} className='link-name'>
                                  Website:
                                </Title>
                              </Col>
                          {
                            filterArray(links?.homepage).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {link}
                                </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                links.announcement_url &&
                  links.announcement_url.length > 0 && 
                    filterArray(links?.announcement_url).length > 0 && 
                      <>
                        <Row className='coin-link'>
                              <Col span={12}>
                                <Title level={5} className='link-name'>
                                  Announcement URL:
                                </Title>
                              </Col>
                          {
                            filterArray(links?.announcement_url).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                  <a
                                    href={link}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-ellipsis'
                                  >
                                    {link}
                                  </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                links.blockchain_site &&
                  links.blockchain_site.length > 0 &&
                    filterArray(links.blockchain_site).length > 0 && 
                      <>
                        <Row className='coin-link'>
                            <Col span={12}>
                              <Title level={5} className='link-name'>
                                Blockchain Site:
                              </Title>
                            </Col>
                          {
                            filterArray(links?.blockchain_site).map((link, i) => (
                              <Col span={12} key={i}>
                              <Button type='link' className='width-100 text-justify'>
                                <a
                                    href={link}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-ellipsis'
                                  >
                                    {link}
                                </a>
                              </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                links.official_forum_url &&
                  links.official_forum_url.length > 0 && 
                    filterArray(links.official_forum_url).length > 0 && 
                      <>
                        <Row className='coin-link'>
                            <Col span={12}>
                              <Title level={5} className='link-name'>
                                Forum URL:
                              </Title>
                            </Col>
                          {
                            filterArray(links?.official_forum_url).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='text-ellipsis'
                                >
                                  {link}
                                </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                links.bitcointalk_thread_identifier &&
                  links.bitcointalk_thread_identifier.length > 0 && 
                    filterArray(links.bitcointalk_thread_identifier).length > 0 && 
                      <>
                        <Row className='coin-link'>
                          <Col span={12}>
                            <Title level={5} className='link-name'>
                              Bitcointalk:
                            </Title>
                          </Col>
                          {
                            filterArray(links?.bitcointalk_thread_identifier).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100'>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {link}
                                </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                links.facebook_username &&
                  <>
                    <Row className='coin-link'>
                      <Col span={12}>
                        <Title level={5} className='link-name'>
                          Facebook:
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Button type='link' className='width-100'>
                          <a
                            href={'https://facebook.com/'+links.facebook_username}
                            target='_blank'
                            rel='noreferrer'
                            className='text-ellipsis'
                          >
                            {links.facebook_username}
                          </a>
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
              }
              {
                links.repos_url?.github &&
                  links.repos_url?.github.length > 0 &&
                    filterArray(links?.repos_url?.github).length > 0 && 
                      <>
                        <Row className='coin-link'>
                              <Col span={12}>
                                <Title level={5} className='link-name'>
                                  Github:
                                </Title>
                              </Col>
                          {
                            filterArray(links?.repos_url?.github).map((link, i) => (
                              <Col span={12} key={i}>
                                <Button type='link' className='width-100 text-justify'>
                                  <a
                                    href={link}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-ellipsis'
                                  >
                                    {link}
                                  </a>
                                </Button>
                              </Col>
                            ))
                          }
                        </Row>
                        <Divider></Divider>
                      </>
              }
              {
                links.subreddit_url &&
                  <>
                    <Row className='coin-link'>
                      <Col span={12}>
                        <Title level={5} className='link-name'>
                          Reddit
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Button type='link' className='width-100'>
                          <a
                            href={links.subreddit_url}
                            target='_blank'
                            rel='noreferrer'
                            className='text-ellipsis'
                          >
                            {links.subreddit_url}
                          </a>
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
              }
              {
                links.twitter_screen_name &&
                  <>
                    <Row className='coin-link'>
                      <Col span={12}>
                        <Title level={5} className='link-name'>
                          Twitter
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Button type='link' className='width-100'>
                          <a
                            href={links.twitter_screen_name}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {links.twitter_screen_name}
                          </a>
                        </Button>
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
              }
    
    </>
  )
}

export default CryptoLinks;