import exactMath from "exact-math";

type result = {likes:number, dislikes:number, rating:number};
export function calcDislikes(likes:number, rating:number):result{
  if(rating === 0) return {
    likes: 0, dislikes: 0, rating
  }
  // 高評価数:x, 低評価数: yとすると
  // (5x + y) / (x + y) = rating
  // 5x + y = rating * x + rating * y
  // (5 - rating) * x = (rating - 1) * y
  // y = { (5 - rating) * x } / (rating - 1)
  if(rating === 1) return {
    likes: 0, dislikes: 1, rating
  };
  const dislikes = exactMath.round(exactMath.div(
    exactMath.mul(exactMath.sub(5, rating),  likes),
    exactMath.sub(rating, 1)
  ), 1);
  return {likes, dislikes, rating};
}