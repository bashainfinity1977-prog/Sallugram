import React, { useState } from 'react';

import { FaBell, FaList, FaSearch, FaPlay, FaThumbsUp, FaEye, FaUserCheck, FaCheckCircle, FaFilter, FaFire, FaClock } from 'react-icons/fa';

import './SubscriptionsPage.css';

import Navbar from '../../components/Navbar/Navbar';



const SubscriptionsPage = () => {

  const [activeItem, setActiveItem] = useState('Subscriptions');

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedFilter, setSelectedFilter] = useState('all');

  const [viewMode, setViewMode] = useState('grid');



  const subscriptions = [

    {

      id: 1,

      name: 'Tech Explorer',

      avatar: '/Minisallu.png',

      subscribers: '2.5M',

      verified: true,

      isSubscribed: false,

      notificationsEnabled: true,

      lastVideo: 'React Hooks Deep Dive - 32:15',

      lastVideoTime: '2 hours ago',

      videoCount: '342',

      totalViews: '45.2M',

      description: 'Amazing tech tutorials and coding content',

      videos: [

        { id: 1, title: 'React Hooks Complete Guide', thumbnail: '/Minisallu.png', duration: '45:20', views: '1.2M', time: '1 day ago' },

        { id: 2, title: 'JavaScript ES6 Features', thumbnail: '/Minisallu.png', duration: '28:15', views: '890K', time: '3 days ago' },

        { id: 3, title: 'CSS Grid Mastery', thumbnail: '/Minisallu.png', duration: '22:45', views: '567K', time: '1 week ago' }

      ]

    },

    {

      id: 2,

      name: 'Design Guru',

      avatar: '/Minisallu.png',

      subscribers: '1.8M',

      verified: true,

      isSubscribed: true,

      notificationsEnabled: false,

      lastVideo: 'Modern UI Design Trends - 15:30',

      lastVideoTime: '5 hours ago',

      videoCount: '256',

      totalViews: '32.1M',

      description: 'Professional design tips and tutorials',

      videos: [

        { id: 1, title: 'Color Theory Basics', thumbnail: '/Minisallu.png', duration: '18:20', views: '2.1M', time: '2 days ago' },

        { id: 2, title: 'Typography Guide', thumbnail: '/Minisallu.png', duration: '25:10', views: '890K', time: '4 days ago' }

      ]

    },

    {

      id: 3,

      name: 'Code Master',

      avatar: '/Minisallu.png',

      subscribers: '956K',

      verified: false,

      isSubscribed: false,

      notificationsEnabled: true,

      lastVideo: 'Backend Development Tutorial - 42:15',

      lastVideoTime: '1 day ago',

      videoCount: '189',

      totalViews: '12.3M',

      description: 'Coding tutorials and best practices',

      videos: [

        { id: 1, title: 'Node.js Crash Course', thumbnail: '/Minisallu.png', duration: '38:45', views: '567K', time: '1 week ago' }

      ]

    },

    {

      id: 4,

      name: 'UI Expert',

      avatar: '/Minisallu.png',

      subscribers: '3.2M',

      verified: true,

      isSubscribed: false,

      notificationsEnabled: false,

      lastVideo: 'Component Library Review - 18:45',

      lastVideoTime: '3 days ago',

      videoCount: '445',

      totalViews: '67.8M',

      description: 'UI/UX design and component reviews',

      videos: [

        { id: 1, title: 'React Component Patterns', thumbnail: '/Minisallu.png', duration: '28:30', views: '3.4M', time: '2 weeks ago' },

        { id: 2, title: 'CSS Animation Tricks', thumbnail: '/Minisallu.png', duration: '15:20', views: '1.8M', time: '3 weeks ago' }

      ]

    },

    {

      id: 5,

      name: 'Data Science Pro',

      avatar: '/Minisallu.png',

      subscribers: '1.5M',

      verified: true,

      isSubscribed: false,

      notificationsEnabled: true,

      lastVideo: 'Machine Learning Basics - 55:20',

      lastVideoTime: '1 week ago',

      videoCount: '128',

      totalViews: '23.4M',

      description: 'Data science and machine learning content',

      videos: [

        { id: 1, title: 'Python for Data Science', thumbnail: '/Minisallu.png', duration: '42:15', views: '2.1M', time: '1 month ago' }

      ]

    },

    {

      id: 6,

      name: 'Gaming Channel',

      avatar: '/Minisallu.png',

      subscribers: '4.7M',

      verified: true,

      isSubscribed: true,

      notificationsEnabled: false,

      lastVideo: 'Epic Gaming Moments - 12:45',

      lastVideoTime: '6 hours ago',

      videoCount: '892',

      totalViews: '156.3M',

      description: 'Gaming content and highlights',

      videos: [

        { id: 1, title: 'Best Gaming Setup 2024', thumbnail: '/Minisallu.png', duration: '18:30', views: '5.6M', time: '2 weeks ago' }

      ]

    }

  ];



  const filteredSubscriptions = subscriptions.filter(sub => 

    sub.name.toLowerCase().includes(searchQuery.toLowerCase())

  );



  const handleSubscribe = (channelId) => {

    // Toggle subscription status

    const channel = subscriptions.find(sub => sub.id === channelId);

    if (channel) {

      channel.isSubscribed = !channel.isSubscribed;

    }

  };



  const handleNotificationToggle = (channelId) => {

    // Toggle notification settings

    const channel = subscriptions.find(sub => sub.id === channelId);

    if (channel) {

      channel.notificationsEnabled = !channel.notificationsEnabled;

    }

  };



  return (

    <div className="subscriptions-page">

      <Navbar 

        activeItem={activeItem} 

        onItemChange={setActiveItem} 

        isSidebarCollapsed={isSidebarCollapsed} 

        setIsSidebarCollapsed={setIsSidebarCollapsed} 

      />

      

      {/* Header Section */}

      <div className="subscriptions-header">

        <div className="header-left">

          <h1>Subscriptions</h1>

        </div>

      </div>



      {/* Stats Overview */}

      <div className="stats-overview">

        <div className="stat-card">

          <div className="stat-icon">

            <FaUserCheck />

          </div>

          <div className="stat-info">

            <h3>Total Subscriptions</h3>

            <p>{subscriptions.length} channels</p>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">

            <FaFire />

          </div>

          <div className="stat-info">

            <h3>New Videos Today</h3>

            <p>24 videos</p>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">

            <FaEye />

          </div>

          <div className="stat-info">

            <h3>Total Views</h3>

            <p>342.5K views</p>

          </div>

        </div>

      </div>



      {/* Subscriptions Grid/List */}

      <div className={`subscriptions-container ${viewMode}`}>

        {filteredSubscriptions.map(channel => (

          <div key={channel.id} className="subscription-card">

            {/* Channel Header */}

            <div className="channel-header">

              <div className="channel-info">

                <img src={channel.avatar} alt={channel.name} className="channel-avatar" />

                <div className="channel-details">

                  <h3 className="channel-name">

                    {channel.name}

                    {channel.verified && <FaCheckCircle className="verified-badge" />}

                  </h3>

                  <p className="channel-description">{channel.description}</p>

                  <div className="channel-stats">

                    <span className="subscribers">{channel.subscribers} subscribers</span>

                    <span className="video-count">{channel.videoCount} videos</span>

                  </div>

                </div>

              </div>

              <div className="channel-actions">

                <button 

                  className={`subscribe-btn ${channel.isSubscribed ? 'subscribed' : ''}`}

                  onClick={() => handleSubscribe(channel.id)}

                >

                  {channel.isSubscribed ? (

                    <>

                      <FaCheckCircle />

                      Subscribed

                    </>

                  ) : (

                    <>

                      <FaUserCheck />

                      Subscribe

                    </>

                  )}

                </button>

                <button 

                  className="notification-btn"

                  onClick={() => handleNotificationToggle(channel.id)}

                  title={channel.notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}

                >

                  <FaBell className={channel.notificationsEnabled ? 'active' : ''} />

                </button>

              </div>

            </div>



            {/* Latest Video */}

            <div className="latest-video">

              <div className="video-thumbnail">

                <img src={channel.videos[0]?.thumbnail || '/Minisallu.png'} alt="Latest video" />

                <div className="video-overlay">

                  <FaPlay className="play-icon" />

                  <span className="video-duration">{channel.videos[0]?.duration || '00:00'}</span>

                </div>

              </div>

              <div className="video-info">

                <h4 className="video-title">{channel.videos[0]?.title || 'No videos yet'}</h4>

                <div className="video-stats">

                  <span className="views">{channel.videos[0]?.views || '0'} views</span>

                  <span className="upload-time">{channel.lastVideoTime}</span>

                </div>

              </div>

            </div>



            {/* Channel Videos Preview */}

            <div className="videos-preview">

              <h4>Recent Videos</h4>

              <div className="preview-grid">

                {channel.videos.slice(0, 3).map(video => (

                  <div key={video.id} className="preview-item">

                    <img src={video.thumbnail} alt={video.title} />

                    <div className="preview-info">

                      <span className="preview-title">{video.title}</span>

                      <span className="preview-duration">{video.duration}</span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>



      {/* Load More */}

      <div className="load-more-section">

        <button className="load-more-btn">Load More Channels</button>

      </div>

    </div>

  );

};



export default SubscriptionsPage;

