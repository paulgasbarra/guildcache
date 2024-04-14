import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import ModelTable from "./ModelTable";
import { useAuth } from "./AuthContext";

const EntityList: React.FC<{
  endpoint: string;
  headers: string[];
  entityType: string;
}> = ({ endpoint, headers, entityType }) => {
  const [entities, setEntities] = useState<Array<any>>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance
        .get(endpoint)
        .then((response) => {
          setEntities(response.data);
        })
        .catch((error) => {
          console.error(
            `Error fetching the ${entityType.toLowerCase()}s:`,
            error
          );
        });
    }
  }, [endpoint, entityType, isAuthenticated]);

  const handleDelete = async (id: string) => {
    const detailEndpoint = `${endpoint}/${id}`; // Assuming a RESTful API
    await axiosInstance
      .delete(detailEndpoint)
      .then(() => {
        setEntities(entities.filter((entity) => entity.id !== id));
      })
      .catch((error) => {
        console.error(`Error deleting the ${entityType.toLowerCase()}:`, error);
      });
  };

  return (
    <div className="space-y-6 w-full">
      {entities.length === 0 && (
        <h2 className="text-2xl font-bold m-4">No {entityType}s found</h2>
      )}
      {entities.length > 0 && (
        <>
          <ModelTable
            modelList={entities}
            headers={headers}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default EntityList;
