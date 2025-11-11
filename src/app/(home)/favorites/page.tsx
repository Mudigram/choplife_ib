// "use client";

// import { useAppSelector } from
// // import { removeFavorite } from "@/store/favoritesSlice";
// import FavoriteCard from "@/components/favorites/FavoriteCard";

// export default function FavoritesPage() {
//   const favorites = useAppSelector((state) => state.favorites.items);
// //   const dispatch = useAppDispatch();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>

//       {favorites.length === 0 ? (
//         <p className="text-gray-500">You haven’t saved any favorites yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {favorites.map((item) => (
//             <FavoriteCard
//               key={item.id}
//               item={item}
//             //   onRemove={() => dispatch(removeFavorite(item.id))}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
