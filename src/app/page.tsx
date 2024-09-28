"use client"; // This directive marks the component as a Client Component

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import G6 from "./g6";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { data } from './data';
import Image from 'next/image'; // Import the Image component from Next.js

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  // Function to find all nodes based on the search value in all properties
  const findNodesBySearchValue = (searchValue: string): any[] => {
    return data.nodes.filter((node) => {
      const allProperties = `${node.data.name} ${node.data.position} ${node.combo}`;
      return allProperties.toLowerCase().includes(searchValue.toLowerCase());
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle search logic
  const handleSearch = () => {
    setSearchTriggered(true);
    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const foundNodes = findNodesBySearchValue(searchValue);

    if (foundNodes.length > 0) {
      setSearchResults(foundNodes);
    } else {
      setSearchResults([]);
    }
  };

  // Allow pressing "Enter" to trigger the search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center size-full sm:items-start ml-8">
      <div className="flex flex-col fixed right-4 top-4 z-10">
        <div className="flex flex-row gap-8 mt-8">
          <Input
            placeholder="Suche ein Amt, Dezernat, ..."
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button style={{ backgroundColor: '#006d80', color: 'white' }} onClick={handleSearch}>
            Suche
          </Button>
          {/* Add the logo image here */}
          {/*
              */}
        </div>




        {/* Display the search results or not found message */}
        <div className="relative flex flex-row gap-8 mt-8"> {/* Keep relative positioning */}
          {searchResults.length > 0 ? (
            <div className='flex flex-col'>
              <h2>Node Details:</h2>
              {searchResults.map((node) => (
                <div
                  key={node.id}
                  className="mb-4 p-4 border rounded shadow-md"
                  style={{ backgroundColor: '#006d80', color: 'white' }} // Use your specific blue color
                >

                  <p><strong>Name:</strong> {node.data.name}</p>
                  <p><strong>Position:</strong> {node.data.position}</p>
                  <p><strong>Combo:</strong> {node.combo}</p>
                  {/* ID is excluded from display */}
                </div>
              ))}
            </div>
          ) : (
            searchTriggered && searchValue.trim() !== "" && (
              <p>Search value "{searchValue}" not found in data.</p>
            )
          )}
        </div>

      </div>

      <Image
        className="fixed top-8 left-8 pointer-events-none z-10"
                  src="/mshack.png"
                  alt="MSHack Logo"
                  width={100}
                  height={100}
              />
      <G6 />
    </main>
  );
}



