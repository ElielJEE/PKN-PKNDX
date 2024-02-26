import React, { useEffect } from "react";
import { GetPokemons } from "../services";
import { useNavigate } from "react-router-dom";

export default function useSearch() {
  const { filtro } = GetPokemons();

  let navigate = useNavigate();

  const searchingHandle = (currentPage) => {
    
  };

  return { searchingHandle };
}
