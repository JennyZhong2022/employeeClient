// src/modals/FilterModal/FilterModal.tsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./FilterModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface FilterModalProps {
  openFilterModal: boolean;
  closeModal: () => void;
  name: string;
  employmentStatus: string;
  employmentBasis: string;
  onApplyFilters: (name: string, status: string, basis: string) => void;
}

const FilterModal = ({
  openFilterModal,
  closeModal,
  name,
  employmentStatus,
  employmentBasis,
  onApplyFilters,
}: FilterModalProps) => {
  const [localName, setLocalName] = useState<string>(name);
  const [localStatus, setLocalStatus] = useState<string>(employmentStatus);
  const [localBasis, setLocalBasis] = useState<string>(employmentBasis);

  // default the past inputs when the modal open again
  useEffect(() => {
    if (openFilterModal) {
      setLocalName(name);
      setLocalStatus(employmentStatus);
      setLocalBasis(employmentBasis);
    }
  }, [openFilterModal, name, employmentStatus, employmentStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(localName, localStatus, localBasis);
  };

  return (
    <Modal
      isOpen={openFilterModal}
      onRequestClose={closeModal}
      className={styles.filterModal}
      overlayClassName={styles.filterModalOverlay}
      contentLabel="Employee Status Filter"
      ariaHideApp={false} // Required to avoid accessibility warnings
    >
      <button onClick={closeModal} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className={styles.modalTitle}>Filters</h2>

      <form className={styles.filterForm} onSubmit={handleSubmit}>
        {/* Name Filter */}
        <div className={styles.searchForm}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className={styles.searchInput}
            placeholder="Enter employee name"
          />
        </div>

        {/* Employment Status Filter */}
        <div className={styles.filterSection}>
          <h4>Employment Status</h4>
          <div className={styles.filterContent}>
            <label className={styles.radioLabel} htmlFor="status-all">
              <input
                type="radio"
                id="status-all"
                value=""
                name="employeeStatus"
                checked={localStatus === ""}
                onChange={(e) => setLocalStatus(e.target.value)}
              />
              All Status
            </label>

            <label className={styles.radioLabel} htmlFor="status-permanent">
              <input
                type="radio"
                id="status-permanent"
                value="Permanent"
                name="employeeStatus"
                checked={localStatus === "Permanent"}
                onChange={(e) => setLocalStatus(e.target.value)}
              />
              Permanent
            </label>

            <label className={styles.radioLabel} htmlFor="status-contract">
              <input
                type="radio"
                id="status-contract"
                value="Contract"
                name="employeeStatus"
                checked={localStatus === "Contract"}
                onChange={(e) => setLocalStatus(e.target.value)}
              />
              Contract
            </label>
          </div>
        </div>

        {/* Employment Basis Filter */}
        <div className={styles.filterSection}>
          <h4>Employment Basis</h4>
          <div className={styles.filterContent}>
            <label className={styles.radioLabel} htmlFor="basis-all">
              <input
                type="radio"
                id="basis-all"
                value=""
                name="employmentBasis"
                checked={localBasis === ""}
                onChange={(e) => setLocalBasis(e.target.value)}
              />
              All Basis
            </label>

            <label className={styles.radioLabel} htmlFor="basis-full-time">
              <input
                type="radio"
                id="basis-full-time"
                value="Full-Time"
                name="employmentBasis"
                checked={localBasis === "Full-Time"}
                onChange={(e) => setLocalBasis(e.target.value)}
              />
              Full-Time
            </label>

            <label className={styles.radioLabel} htmlFor="basis-part-time">
              <input
                type="radio"
                id="basis-part-time"
                value="Part-Time"
                name="employmentBasis"
                checked={localBasis === "Part-Time"}
                onChange={(e) => setLocalBasis(e.target.value)}
              />
              Part-Time
            </label>
          </div>
        </div>

        <div className={styles.filterModalActions}>
          <button type="submit" className={styles.confirmBtn}>
            Apply Filter
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FilterModal;
