type TileStyle = {
  // an index number to identify the tile
  id: number | null;
  // an array of two numbers representing the tile's position on the board
  position: [number, number];
  // tile value : 2, 4, 8, 16, 32, ... , 2048
  value: number;
};

export const Tile = ({ value }: TileStyle) => {
  return <div className={`tile tile-${value}`}>{value > 0 ? value : ''}</div>;
};
