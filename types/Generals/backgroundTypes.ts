// types/Generals/backgroundTypes.ts
export interface BackgroundProps {
  type: "Hexagon" | "Circle" | "Alphabet";
  className?: string;
}

// Hexagon Props Interface  the animation at home page
export interface HexagonProps {
  direction: "left" | "right";
  position: "up" | "down";
  className?: string;
}

// Circle Props Interface
export interface CircleProps {
  direction: "left" | "right";
  position: "up" | "down";
  className?: string;
}

// Letter Props Interface
export interface LetterProps {
    letter: string;
    animationType: 'appears' | 'moveHorizontal' | 'moveDiagonal';
    position: { x: number; y: number };
    targetPosition?: { x: number; y: number };
    className?: string;
    size?: number;
}

// Alphabet Props Interface
export interface AlphabetProps {
  className?: string;
}