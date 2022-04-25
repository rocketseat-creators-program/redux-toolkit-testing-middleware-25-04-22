import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectFavoritedResults,
  selectFavorites,
  selectFilteredResults,
} from "../features/home/HomeSelectors";
import { addFavorite, removeFavorite } from "../features/home/HomeSlice";
import { Item } from "./Item";

type Props = {
  filterByFavorites?: boolean;
};

export const ItemList = ({ filterByFavorites }: Props) => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectFilteredResults);
  const favoriteIdsList = useAppSelector(selectFavorites);
  const favoritedItems = useAppSelector(selectFavoritedResults);

  const itemList = filterByFavorites ? favoritedItems : results;

  const handleToggleFavorite = (id: number) => {
    favoriteIdsList.includes(id)
      ? dispatch(removeFavorite(id))
      : dispatch(addFavorite(id));
  };

  return (
    <ul data-testid="result-list">
      {itemList.length === 0 && (
        <div className="py-2">
          <div className="p-4 bg-white rounded-lg ">
            <div className="text-center text-xl">No results found</div>
          </div>
        </div>
      )}
      {itemList.map((result, index) => (
        <li key={index}>
          <Item
            name={result.name}
            title={result.place}
            image={result.image}
            price={result.price}
            isFavorite={favoriteIdsList.includes(result.id)}
            onCLickHandle={() => handleToggleFavorite(result.id)}
          />
        </li>
      ))}
    </ul>
  );
};
