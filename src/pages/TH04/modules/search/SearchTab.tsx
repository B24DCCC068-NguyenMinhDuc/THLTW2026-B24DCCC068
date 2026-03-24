import React, { useState } from "react";
import { Card, message } from "antd";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

const SearchTab = ({ diplomas, decisions, setDecisions }) => {
  const [results, setResults] = useState([]);

  const handleSearch = (values) => {
    const filters = Object.entries(values).filter(
      ([_, v]) => v !== undefined && v !== ""
    );

    if (filters.length < 2) {
      message.error("Nhập ít nhất 2 tiêu chí!");
      return;
    }

    let filtered = diplomas;

    filters.forEach(([key, value]) => {
      filtered = filtered.filter(item => {
        if (key === "dob") {
          return item.dob === value.format("YYYY-MM-DD");
        }
        return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    });

    const updatedDecisions = [...decisions];
    filtered.forEach(diploma => {
      const decision = updatedDecisions.find(d => d.id === diploma.decisionId);
      if (decision) decision.searchCount += 1;
    });

    setDecisions(updatedDecisions);
    setResults(filtered);
  };

  return (
    <Card>
      <SearchForm onSearch={handleSearch} />
      <SearchResult data={results} decisions={decisions} />
    </Card>
  );
};

export default SearchTab;