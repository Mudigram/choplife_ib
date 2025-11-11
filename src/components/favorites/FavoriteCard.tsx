// import Image from "next/image";
// import { Heart } from "lucide-react";

// export default function FavoriteCard({ item, onRemove }: any) {
//     return (
//         <div className="border rounded-2xl p-4 flex flex-col gap-2 shadow-sm bg-white hover:shadow-md transition">
//             <Image
//                 src={item.image_url}
//                 alt={item.name}
//                 width={400}
//                 height={200}
//                 className="rounded-xl object-cover w-full h-48"
//             />
//             <div>
//                 <h2 className="text-lg font-bold">{item.name}</h2>
//                 <p className="text-sm text-gray-500">{item.category}</p>
//             </div>
//             <p className="text-gray-600 text-sm">{item.description}</p>

//             <button
//                 onClick={onRemove}
//                 className="self-end flex items-center text-red-500 mt-2 hover:opacity-70"
//             >
//                 <Heart className="w-5 h-5 fill-red-500 mr-1" /> Remove
//             </button>
//         </div>
//     );
// }
