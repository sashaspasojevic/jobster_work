import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../../componets";
import {
  clearValues,
  createJob,
  handleChange,
} from "../../features/user/job/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    dispatch(
      handleChange({
        name: "jobLocation",
        value: user.location,
      })
    );
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          {/* <div className='form-row'>
            <label htmlFor='status' className='form-label'>
              status
            </label>
            <select
              name='status'
              id='status'
              value={status}
              onChange={handleJobInput}
              className='form-select'
            >
              {statusOptions.map((itemValue, index) => {
                return (
                  <option value='itemValue' key={index}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div> */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            value={jobType}
            labelText='job type'
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-bloc clear-btn'
              onClick={() => {
                dispatch(clearValues());
              }}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-bloc submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
