import React, { useEffect, useState } from "react";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CitiesRow } from "./CitiesRow";

export const CitiesList = (props) => {
  const {
    passengers = [],
    pagesCount,
    currentPage,
    setCurrentPage,
    setSearchParams,
    searchParams,
    setPassengers,
  } = props;
  const [name, setName] = useState(searchParams.get("name") || "");
  const [okato, setOkato] = useState(searchParams.get("okato") || "");
  const [oktmo, setOktmo] = useState(searchParams.get("oktmo") || "");
  const [shortName, setShortName] = useState(
    searchParams.get("shortName") || ""
  );
  const [filteredPassengers, setFilteredPassengers] = useState(passengers);

  const resetSearchHandler = () => {
    setName("");
    setOkato("");
    setOktmo("");
    setSearchParams({
      page: currentPage,
    });
    setFilteredPassengers(passengers);
  };

  const paginationHandler = (type) => {
    let newPage = currentPage;
    if (type === "increment" && currentPage < pagesCount) {
      newPage = currentPage + 1;
      setCurrentPage(newPage);
      smartSearch();
    } else if (type === "decrement" && currentPage > 1) {
      newPage = currentPage - 1;
      setCurrentPage(newPage);
      smartSearch();
    }
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: newPage,
      ...(okato ? { okato: okato } : null),
      ...(shortName ? { shortName: shortName } : null),
      ...(oktmo ? { oktmo: oktmo } : null),
      ...(name ? { name: name } : null),
    }));
  };

  const pageHandler = (value) => {
    const pageNumber = parseInt(value, 10);
    setCurrentPage(pageNumber);
    smartSearch();
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: pageNumber,
      ...(okato ? { okato: okato } : null),
      ...(shortName ? { shortName: shortName } : null),
      ...(oktmo ? { oktmo: oktmo } : null),
      ...(name ? { name: name } : null),
    }));
  };

  useEffect(() => {
    setFilteredPassengers(passengers);
    smartSearch()
  }, [passengers]);

  const smartSearch = () => {
    const filteredData = passengers.filter((driver) => {
        if (name && !driver.name.toLowerCase().includes(name.toLowerCase())) {
            return false;
        }
        if (shortName && !driver.shortName.toLowerCase().includes(shortName.toLowerCase())) {
            return false;
        }
        if (okato && !driver.okato.toLowerCase().includes(okato.toLowerCase())) {
            return false;
        }
        if (oktmo && !driver.oktmo.toLowerCase().includes(oktmo.toLowerCase())) {
            return false;
        }
        return true;
    });

    setSearchParams({
        page: currentPage,
        ...(okato ? { okato: okato } : null),
        ...(shortName ? { shortName: shortName } : null),
        ...(oktmo ? { oktmo: oktmo } : null),
        ...(name ? { name: name } : null),
    });
    setFilteredPassengers(filteredData); 
  };

  return (
    <div className="drivers_table home_content">
      <div className="drivers_filter">
        <input
          type="text"
          placeholder="Поиск по наименованию"
          onChange={(e) => {
            setSearchParams({
              page: currentPage,
              ...(okato ? { okato: okato } : null),
              ...(shortName ? { shortName: shortName } : null),
              ...(oktmo ? { oktmo: oktmo } : null),
              ...(name ? { name: e.target.value } : null),
            });
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          type="text"
          placeholder="Поиск по сокращению"
          onChange={(e) => {
            setSearchParams({
              page: currentPage,
              ...(okato ? { okato: okato } : null),
              ...(shortName ? { shortName: e.target.value } : null),
              ...(oktmo ? { oktmo: oktmo } : null),
              ...(name ? { name: name } : null),
            });
            setShortName(e.target.value);
          }}
          value={shortName}
        />
        <input
          type="text"
          placeholder="Поиск по ОКАТО"
          onChange={(e) => {
            setSearchParams({
              page: currentPage,
              ...(okato ? { okato: e.target.value } : null),
              ...(shortName ? { shortName: shortName } : null),
              ...(oktmo ? { oktmo: oktmo } : null),
              ...(name ? { name: name } : null),
            });
            setOkato(e.target.value);
          }}
          value={okato}
        />
        <input
          type="text"
          placeholder="Поиск по ОКТМО   "
          onChange={(e) => {
            setSearchParams({
              page: currentPage,
              ...(okato ? { okato: okato } : null),
              ...(shortName ? { shortName: shortName } : null),
              ...(oktmo ? { oktmo: e.target.value } : null),
              ...(name ? { name: name } : null),
            });
            setOktmo(e.target.value);
          }}
          value={oktmo}
        />
      </div>
      <div className="drivers_search">
        <button className="search_reset" onClick={resetSearchHandler}>
          Сбросить
        </button>
        <button className="search_find" onClick={smartSearch}>
          Поиск
        </button>
      </div>
      <div className="drivers_row drivers_header">
        <div>
          Сокращение
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>

        <div>
          Наименование
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>
        <div>
          Оф.наименование
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>
        <div>
          Окато
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>
        <div>
          Октмо
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>
        <div>
          Долгота
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>
        <div>
          Ширина
          <SwitchLeftIcon sx={{ rotate: "90deg" }} />
        </div>
      </div>
      {filteredPassengers
        .slice((currentPage - 1) * 30, currentPage * 30)
        .map((passenger, index) => {
            console.log(filteredPassengers);
          return <CitiesRow key={index} passenger={passenger} />;
        })}

      <div className="drivers_pagination">
        <div onClick={() => paginationHandler("decrement")}>
          <ArrowBackIcon />
        </div>
        {currentPage > 1 ? (
          <div onClick={() => pageHandler(currentPage - 1)}>
            {currentPage - 1}
          </div>
        ) : null}
        <div className="active_page">{currentPage}</div>
        {currentPage < pagesCount ? (
          <div onClick={() => pageHandler(currentPage + 1)}>
            {currentPage + 1}
          </div>
        ) : null}
        <div onClick={() => paginationHandler("increment")}>
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  );
};
