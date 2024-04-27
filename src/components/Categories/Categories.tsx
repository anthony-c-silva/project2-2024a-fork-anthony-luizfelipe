import { useState, useEffect } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getQuestionsData, question } from '../Questions/QuestionsSource';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Categories.css';

const categories = [
  { value: "0", label: "Any Category", icon: "fa-star" },
  { value: "9", label: "General Knowledge", icon: "fa-globe" },
  { value: "10", label: "Entertainment: Books", icon: "fa-book" },
  { value: "11", label: "Entertainment: Film", icon: "fa-film" },
  { value: "12", label: "Entertainment: Music", icon: "fa-music" },
  { value: "13", label: "Entertainment: Musicals & Theatres", icon: "fa-camera" },
  { value: "14", label: "Entertainment: Television", icon: "fa-tv" },
  { value: "15", label: "Entertainment: Video Games", icon: "fa-gamepad" },
  { value: "16", label: "Entertainment: Board Games", icon: "fa-table" },
  { value: "17", label: "Science & Nature", icon: "fa-flask" },
  { value: "18", label: "Science: Computers", icon: "fa-laptop" },
  { value: "19", label: "Science: Mathematics", icon: "fa-calculator" },
  { value: "20", label: "Mythology", icon: "fa-dragon" },
  { value: "21", label: "Sports", icon: "fa-football-ball" },
  { value: "22", label: "Geography", icon: "fa-globe-americas" },
  { value: "23", label: "History", icon: "fa-history" },
  { value: "24", label: "Politics", icon: "fa-landmark" },
  { value: "25", label: "Art", icon: "fa-paint-brush" },
  { value: "26", label: "Celebrities", icon: "fa-star" },
  { value: "27", label: "Animals", icon: "fa-paw" },
  { value: "28", label: "Vehicles", icon: "fa-car" },
  { value: "29", label: "Entertainment: Comics", icon: "fa-comic" },
  { value: "30", label: "Science: Gadgets", icon: "fa-mobile-alt" },
  { value: "31", label: "Entertainment: Japanese Anime & Manga", icon: "fa-japanese-maple" },
  { value: "32", label: "Entertainment: Cartoon & Animations", icon: "fa-film" }
];


function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [questions, setQuestions] = useState<question[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("0"); 
  const navigate = useNavigate();
  const [categoryAvailable, setCategoryAvailable] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");

  useEffect(() => {
    if (loaded) {
      navigate('/question', { state: { questions } }); 
    }
  }, [loaded, questions, selectedCategory, selectedDifficulty, navigate]);

  const trigQuestions = () => {
    getQuestionsData(selectedCategory, selectedDifficulty).then((data) => {
      setQuestions(data);
      if (data && data.length > 0) {
        setLoaded(true);
      } else {
        setCategoryAvailable(false);
      }
    });
  };
  
  const handleCategorySelect = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
  }

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  }

  return (
    <div className="main-content">
      <nav className="navbar nav-user">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} />
          </a>
          <h1 className="text-white mx-auto">CATEGORIAS</h1>
          {!categoryAvailable && (
          <div className="alert alert-warning " role="alert">
            Essa categoria não está disponível no momento. Por favor, escolha outra categoria.
          </div>
        )}
        </div>
        
      </nav>
      <div className=" container-fluid">
        <div className="text-white">
          <h2 className=" text-center mb-3">Escolha a dificuldade</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-5">
          <select className="text-select form-select w-25" value={selectedDifficulty} onChange={(e) => handleDifficultySelect(e.target.value)}>
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
        
        <div className='text-white'>
          <h2 className="text-center mb-5">Escolha uma categoria</h2>
        </div>
        <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} interval={null} indicators={false}>
          <Carousel.Item>
            <div className="row category-row m-5">
              {categories.slice(0, 6).map((category, index) => (
                <div className={`col-6 category-item ${selectedCategory === category.value ? 'category-item-selected' : ''}`} key={index} onClick={() => handleCategorySelect(category.value)}>
                  <div className="category-item-content">
                   <i className={`fa ${category.icon} category-icon pt-3 mt-1 mb-3 fs-4`} ></i>

                    <p>{category.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row category-row m-5">
              {categories.slice(6, 12).map((category, index) => (
                <div className={`col-6 category-item ${selectedCategory === category.value ? 'category-item-selected' : ''}`} key={index} onClick={() => handleCategorySelect(category.value)}>
                  <div className="category-item-content">
                  <i className={`fa ${category.icon} category-icon pt-3 mt-1 mb-3 fs-4`} ></i>
                    <p>{category.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
          
        </Carousel>
      </div>
      
      <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
        <Button
          style={{ backgroundColor: '#FF9A30', minWidth:'30%', paddingTop: '15px', paddingBottom: '15px', fontSize: '1.5em'}}
          variant="primary"
          onClick={trigQuestions}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

export default Categories;
