import React, { useState } from 'react';
import { FaPlay, FaHeart, FaClock, FaPlus, FaEdit, FaTrash, FaShare, FaDownload, FaEllipsisH } from 'react-icons/fa';
import './PlaylistsPage.css';
import Navbar from '../../components/Navbar/Navbar';

const PlaylistsPage = () => {
  const [activeItem, setActiveItem] = useState('Playlists');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const playlists = [
    {
      id: 1,
      name: 'Watch Later',
      description: 'Videos to watch later',
      videoCount: 24,
      thumbnail: '/Minisallu.png',
      isPrivate: false,
      createdAt: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Liked Videos',
      description: 'Videos you liked',
      videoCount: 156,
      thumbnail: '/Minisallu.png',
      isPrivate: false,
      createdAt: '1 month ago'
    },
    {
      id: 3,
      name: 'Tech Reviews',
      description: 'Technology review videos',
      videoCount: 89,
      thumbnail: '/Minisallu.png',
      isPrivate: false,
      createdAt: '3 months ago'
    },
    {
      id: 4,
      name: 'Music Collection',
      description: 'Favorite music videos',
      videoCount: 234,
      thumbnail: '/Minisallu.png',
      isPrivate: true,
      createdAt: '6 months ago'
    },
    {
      id: 5,
      name: 'Workout Videos',
      description: 'Exercise and fitness content',
      videoCount: 45,
      thumbnail: '/Minisallu.png',
      isPrivate: false,
      createdAt: '1 year ago'
    }
  ];

  const handleCreatePlaylist = () => {
    setShowCreateModal(true);
  };

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="playlists-page">
      <Navbar 
        activeItem={activeItem} 
        onItemChange={setActiveItem} 
        isSidebarCollapsed={isSidebarCollapsed} 
        setIsSidebarCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Header Section */}
      <div className="playlists-header">
        <div className="header-left">
          <h1>Playlists</h1>
          <p style={{paddingLeft:'20px'}}>{playlists.length} playlists</p>
        </div>
        <button className="create-playlist-btn" onClick={handleCreatePlaylist}>
          <FaPlus />
          <span>Create Playlist</span>
        </button>
      </div>

      {/* Playlists Grid */}
      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id} 
            className="playlist-card"
            onClick={() => handlePlaylistClick(playlist)}
          >
            {/* Playlist Thumbnail */}
            <div className="playlist-thumbnail">
              <img src={playlist.thumbnail} alt={playlist.name} />
              <div className="playlist-overlay">
                <div className="video-count">
                  <FaPlay />
                  <span>{playlist.videoCount}</span>
                </div>
              </div>
              {playlist.isPrivate && (
                <div className="private-badge">
                  <span>Private</span>
                </div>
              )}
            </div>

            {/* Playlist Info */}
            <div className="playlist-info">
              <h3 className="playlist-name">{playlist.name}</h3>
              <p className="playlist-description">{playlist.description}</p>
              
              {/* Playlist Metadata */}
              <div className="playlist-meta">
                <div className="meta-item">
                  <FaClock />
                  <span>{playlist.createdAt}</span>
                </div>
                <div className="meta-item">
                  <span>{playlist.videoCount} videos</span>
                </div>
              </div>

              {/* Playlist Actions */}
              <div className="playlist-actions">
                <button className="action-btn play-btn">
                  <FaPlay />
                  <span>Play</span>
                </button>
                <button className="action-btn">
                  <FaShare />
                  <span>Share</span>
                </button>
                <button className="action-btn">
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button className="action-btn delete-btn">
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="create-playlist-modal">
            <div className="modal-header">
              <h2>Create New Playlist</h2>
              <button className="close-modal" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <input 
                type="text" 
                placeholder="Playlist name" 
                className="playlist-name-input"
              />
              <textarea 
                placeholder="Description (optional)" 
                className="playlist-description-input"
                rows="3"
              />
              <div className="privacy-options">
                <label className="privacy-option">
                  <input type="radio" name="privacy" value="public" defaultChecked />
                  <span>Public</span>
                </label>
                <label className="privacy-option">
                  <input type="radio" name="privacy" value="private" />
                  <span>Private</span>
                </label>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="create-btn">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
