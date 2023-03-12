import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';


const AvailableMeals = () => {
  const [loadedMeal, setLoadedMeals] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState('');
  useEffect(
    () => {
      const fetchmeals=async()=>{
      const response=await fetch('https://react-projects-abc88-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      const  responseData=await response.json();
        if(!response.ok){
          throw new Error('Something went wrong');
        }
      const loadedMeals=[];
      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setLoadedMeals(loadedMeals);
      setIsLoading(false);
    };
  fetchmeals().catch(error=>{
    setIsLoading(false);
    setHttpError(error.message);
  })
}, []);
  if(isLoading){
    return (
    <section className={classes.loadmeals}>
      <p>Loading Meals...</p>
    </section>
    )
  }
  if(httpError){
    return (
    <section className={classes.errorstate}>
      <p>{httpError}</p>
    </section>
    )
  }
  const mealsList = loadedMeal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;