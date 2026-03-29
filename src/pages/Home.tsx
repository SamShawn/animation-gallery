import { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import WorkGrid from '../components/WorkGrid/WorkGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterTags from '../components/FilterTags/FilterTags';
import Modal from '../components/Modal/Modal';
import { useGalleryStore } from '../store/galleryStore';
import { works as initialWorks } from '../data/works';
import './Home.css';

function Home() {
  const { setWorks } = useGalleryStore();

  useEffect(() => {
    // 初始化作品数据
    const allWorks = initialWorks;
    setWorks(allWorks);
  }, [setWorks]);

  return (
    <div className="home">
      <Hero />
      <main className="main">
        <div className="container">
          <SearchBar />
          <FilterTags />
          <WorkGrid />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Animation Gallery. All rights reserved.
          </p>
        </div>
      </footer>
      <Modal />
    </div>
  );
}

export default Home;