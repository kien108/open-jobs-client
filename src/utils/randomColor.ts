interface RandomColorProps {
   id: string;
   saturation?: number;
   range?: number;
   lightness?: number;
}

const randomColor = (props: RandomColorProps) => {
   const { id, saturation = 45, range = 15, lightness = 70 } = props;

   const getRange = (value: number, range: number) => {
      return [Math.max(0, value - range), Math.min(value + range, 100)];
   };

   const getHashOfString = (str: string) => {
      let hash = 0;

      for (let i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      hash = Math.abs(hash);

      return hash;
   };

   const normalizeHash = (hash: number, min: number, max: number) => {
      return Math.floor((hash % (max - min)) + min);
   };

   const generateHSL = (id: string, saturationRange: number[], lightnessRange: number[]) => {
      const hash = getHashOfString(id);
      const h = normalizeHash(hash, 0, 360);
      const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
      const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);

      return [h, s, l];
   };

   const convertHSLtoString = (hsl: any) => {
      return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
   };

   const generateColorHSL = (id: string, saturationRange: number[], lightnessRange: number[]) => {
      const generatedHSL = generateHSL(id, saturationRange, lightnessRange);

      return convertHSLtoString(generatedHSL);
   };

   const saturationRange = getRange(saturation, range);
   const lightnessRange = getRange(lightness, range);
   const colorHSL = generateColorHSL(id, saturationRange, lightnessRange);

   return colorHSL;
};

export default randomColor;
