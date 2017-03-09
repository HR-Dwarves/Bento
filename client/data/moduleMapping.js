import List from '../components/List/List';
import NewsFeed from '../components/NewsFeed/NewsFeed.js';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import StickyNotes from '../components/StickyNotes/StickyNotes';
import Modal from '../components/Modal/Modal';
import LatLong from '../components/LatLong/LatLong';
import PhotoPrompt from '../components/PhotoPrompt/PhotoPrompt';
import Arcade from '../components/Arcade/Arcade';
import Focus from '../components/Focus/Focus';
import Quote from '../components/Quote/Quote';
import BackgroundChanger from '../components/BackgroundChanger/BackgroundChanger';
import DefaultModule from '../components/DefaultModule/DefaultModule';

var moduleList = {
  'List': List,
  'NewsFeed': NewsFeed,
  'Hacker News': NewsFeed,
  'Weather': WeatherDetails,
  'WeatherDetails': WeatherDetails,
  'StickyNotes': StickyNotes,
  'Sticky Note': StickyNotes,
  'LatLong': LatLong,
  'Clock': LatLong,
  'One Photo Per Day': PhotoPrompt,
  'Arcade': Arcade,
  'Focus': Focus,
  'Quote': Quote,
  'BackgroundChanger': BackgroundChanger,
};

export default moduleList;