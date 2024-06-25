import React, { useState, useEffect } from "react";
import CreateParticipantForm from "./CreateOrUpdateParticipantForm";
// import UpdateParticipantForm from "./UpdateParticipantForm";
import { deleteParticipant, getAllParticipants } from "../services/fetchParticipants";
import { ParticipantResponse } from "../global_interfaces/participant_interface";
import { Link } from "react-router-dom";

export default function ParticipantsCreateUpdatePage(): JSX.Element {
  const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
  const [participants, setParticipants] = useState<ParticipantResponse[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<ParticipantResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>(""); // State for gender filter
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>(""); // State for age group filter
  const [clubFilter, setClubFilter] = useState<string>(""); // State for club filter
  const [disciplineFilter, setDisciplineFilter] = useState<string>(""); // State for discipline filter
  const [sortBy, setSortBy] = useState<string>("name"); // State for sorting criteria
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State for sorting order

  useEffect(() => {
    // Fetch all participants when the component mounts
    getAllParticipants().then((data) => {
      setParticipants(data);
      setFilteredParticipants(data); // Initialize filtered participants with all participants
    });
  }, []);

  // Function to switch to update form
  const handleEditParticipant = (participantId: number) => {
    setSelectedParticipantId(participantId);
    // setIsCreating(false);
  };

  const handleDeleteParticipant = async (participantId: number) => {
    try {
      await deleteParticipant(participantId);
      console.log("is delete, no participant anymore.. sadness: ", participantId);
      setParticipants(await getAllParticipants());
    } catch (error) {
      console.error("AAAAAAAAAAAAAAAAAAAHHH cannot delete: ", error);
    }
  };

  // Function to handle filtering based on all criteria
  const applyFilters = () => {
    const updatedList = participants.filter((participant) => {
      let matchesSearch = true;
      if (searchTerm && !participant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchesSearch = false;
      }
      if (genderFilter && participant.gender !== genderFilter) {
        matchesSearch = false;
      }
      if (ageGroupFilter && participant.ageGroup !== ageGroupFilter) {
        matchesSearch = false;
      }
      if (clubFilter && participant.clubName !== clubFilter) {
        matchesSearch = false;
      }
      if (disciplineFilter && !participant.disciplines.some((discipline) => discipline.name === disciplineFilter)) {
        matchesSearch = false;
      }
      return matchesSearch;
    });

    // Apply sorting
    updatedList.sort((a, b) => {
      if (sortBy === "age") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortBy === "name") {
        return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
      } else if (sortBy === "club") {
        return sortOrder === "asc" ? a.clubName.localeCompare(b.clubName) : b.clubName.localeCompare(a.clubName);
      }
      return 0;
    });

    setFilteredParticipants(updatedList);
  };

  // Function to reset filters and sorting
  const resetFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setAgeGroupFilter("");
    setClubFilter("");
    setDisciplineFilter("");
    setSortBy("age");
    setSortOrder("asc");
    setFilteredParticipants(participants);
  };

  // Handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [sortByValue, sortOrderValue] = value.split("-");
    setSortBy(sortByValue);
    setSortOrder(sortOrderValue as "asc" | "desc");
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, genderFilter, ageGroupFilter, clubFilter, disciplineFilter, sortBy, sortOrder, participants]);

  return (
    <div>
      <h1>Se, Tilføj og Rediger Deltager</h1>

      {/* Search input */}
      <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {/* Filters */}
      <div>
        <label>
          Gender:
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="BINARY">Binary</option>
            <option value="TRANSmTf">TransMtF</option>
            <option value="TRANSfTm">TransFtM</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label>
          Age Group:
          <select value={ageGroupFilter} onChange={(e) => setAgeGroupFilter(e.target.value)}>
            <option value="">All</option>
            <option value="CHILD">Child</option>
            <option value="YOUTH">Youth</option>
            <option value="JUNIOR">Junior</option>
            <option value="ADULT">Adult</option>
            <option value="SENIOR">Senior</option>
            {/* Add more age groups as needed */}
          </select>
        </label>
        <label>
          Club:
          <select value={clubFilter} onChange={(e) => setClubFilter(e.target.value)}>
            <option value="">All</option>
            {/* Populate options dynamically from available clubs */}
            {Array.from(new Set(participants.map((p) => p.clubName))).map((clubName, index) => (
              <option key={index} value={clubName}>
                {clubName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Discipline:
          <select value={disciplineFilter} onChange={(e) => setDisciplineFilter(e.target.value)}>
            <option value="">All</option>
            {/* Populate options dynamically from available disciplines */}
            {Array.from(new Set(participants.flatMap((p) => p.disciplines.map((d) => d.name)))).map((disciplineName, index) => (
              <option key={index} value={disciplineName}>
                {disciplineName}
              </option>
            ))}
          </select>
        </label>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Display list of participants in a table */}
      <table style={{ borderSpacing: "10px", borderCollapse: "separate" }}>
        <thead>
          <tr>
            <th>
              Name
              <select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
                <option value="name-asc">A-Z</option>
                <option value="name-desc">Z-A</option>
              </select>
            </th>
            <th>
              Age
              <select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
                <option value="age-asc">Youngest to Oldest</option>
                <option value="age-desc">Oldest to Youngest</option>
              </select>
            </th>
            <th>Gender</th>
            <th>Club Name</th>
            <th>Disciplines</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ border: "" }}>
          {filteredParticipants.map((participant) => {
            return (
              <tr key={participant.id}>
                <td>{participant.name}</td>
                <td>{participant.age}</td>
                <td>{participant.gender}</td>
                <td>{participant.clubName}</td>
                <td>{participant.disciplines.map((discipline) => discipline.name)}</td> {/* Display discipline names */}
                <td style={{ display: "flex" }}>
                  <button style={{ backgroundColor: "orange", color: "black" }} onClick={() => handleEditParticipant(participant.id!)}>
                    Edit
                  </button>
                  <button style={{ backgroundColor: "red" }} onClick={() => handleDeleteParticipant(participant.id!)}>
                    Slet
                  </button>
                  <Link to={`/participants/${participant.id}`}>
                    <button style={{ backgroundColor: "green" }}>Se detaljer</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {<CreateParticipantForm participantId={selectedParticipantId!} setParticipants={setParticipants} />}
    </div>
  );
}
