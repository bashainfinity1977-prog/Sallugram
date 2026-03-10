import React, { useState } from 'react';
import { FaClock, FaPlay, FaTrash, FaEye, FaThumbsUp, FaComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import './WatchLaterPage.css';
import Navbar from '../../components/Navbar/Navbar';

const WatchLaterPage = () => {
  const [activeItem, setActiveItem] = useState('Watch Later');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const watchLaterVideos = [
    {
      id: 1,
      title: 'Amazing Tech Discovery 2024',
      channel: 'TechGuru',
      views: '1.2M views',
      duration: '12:34',
      timestamp: '2 days ago',
      thumbnail: 'https://picsum.photos/400/400?random=1'
    },
    {
      id: 2,
      title: 'Beautiful Sunset Photography',
      channel: 'PhotoMaster',
      views: '856K views',
      duration: '8:45',
      timestamp: '1 week ago',
      thumbnail: 'https://picsum.photos/400/400?random=2'
    },
    {
      id: 3,
      title: 'Cooking Masterclass',
      channel: 'FoodieLife',
      views: '2.3M views',
      duration: '15:22',
      timestamp: '3 days ago',
      thumbnail: 'https://picsum.photos/400/400?random=3'
    },
    {
      id: 4,
      title: 'Gaming Highlights Reel',
      channel: 'ProGamer',
      views: '5.6M views',
      duration: '9:18',
      timestamp: '1 day ago',
      thumbnail: 'https://picsum.photos/400/400?random=4'
    },
    {
      id: 5,
      title: 'Travel Vlog 2024',
      channel: 'Wanderlust',
      views: '923K views',
      duration: '18:45',
      timestamp: '4 days ago',
      thumbnail: 'https://picsum.photos/400/400?random=5'
    },
    {
      id: 6,
      title: 'Music Video Clip',
      channel: 'MusicVibes',
      views: '3.1M views',
      duration: '4:12',
      timestamp: '5 hours ago',
      thumbnail: 'https://picsum.photos/400/400?random=6'
    }
  ];

  const filteredVideos = watchLaterVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFromWatchLater = (id) => {
    console.log('Removed from watch later:', id);
  };

  return (
    <div className="watch-later-page" style={{ marginLeft: isSidebarCollapsed ? '72px' : '240px' }}>
      <Navbar 
        activeItem={activeItem} 
        onItemChange={setActiveItem} 
        isSidebarCollapsed={isSidebarCollapsed} 
        setIsSidebarCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Header Section */}
      <div className="watch-later-header">
        <div className="header-left">
          <h1><FaClock className="header-icon" /> Watch Later</h1>
        </div>
        <div className="header-right">
          <div className="header-search-bar">
            <div className="search-icon-wrapper">
              <FaPlay className="header-search-icon" />
              <span className="search-tooltip">Search</span>
            </div>
            <input
              type="text"
              placeholder="Search watch later videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="watch-later-grid">
        {filteredVideos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <div className="video-duration">{video.duration}</div>
              <div className="video-overlay">
                <FaPlay className="play-icon" />
              </div>
            </div>
            <div className="video-info-bottom">
              <h3>{video.title}</h3>
              <p className="video-channel">{video.channel}</p>
              <p className="video-views">{video.views}</p>
            </div>

            <button 
              className="remove-btn"
              onClick={() => handleRemoveFromWatchLater(video.id)}
              title="Remove from Watch Later"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="load-more-section">
        <button className="load-more-btn">Load More </button>
      </div>
    </div>
  );
};

export default WatchLaterPage;
