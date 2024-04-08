import axios, { AxiosError } from "axios";
import { Sleep } from "../types";

const API_BASE_URL =
  "http://localhost:3000" || process?.env?.REACT_APP_API_BASE_URL;
const entity = "sleep";

export const exceptionHandler = (error: unknown, msg: string) => {
  console.error(`${msg}:`, error);
  if (error instanceof AxiosError) {
    // AxiosError is a class
    return {
      data: error?.response?.data,
      message: error?.response?.data?.message || [msg],
      statusCode: error?.response?.status || 500,
    };
  } else {
    return new Error(msg);
  }
};

export default class SleepsService {
  static async create(sleep: Partial<Sleep>): Promise<Sleep | null> {
    const payload = { ...sleep };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/${entity}s`,
        payload
      );
      return response.data;
    } catch (error) {
      throw exceptionHandler(error, `Error creating ${entity}`);
    }
  }

  static async findAll(): Promise<Sleep[]> {
    try {
      const response: { data: Sleep[] } = await axios.get(
        `${API_BASE_URL}/api/${entity}s`
      );
      return response.data;
    } catch (error) {
      throw exceptionHandler(error, `Error fetching ${entity}s`);
    }
  }

  static async findSleepsByDays(days: number, name?: string): Promise<Sleep[]> {
    console.log(days, name);
    try {
      const queryParams: { [key: string]: string } = { days: days.toString() }; // Convert days to string
      if (name !== undefined) {
        queryParams.name = name; // Add name parameter if provided
      }

      const response: { data: Sleep[] } = await axios.get(
        `${API_BASE_URL}/api/${entity}s/bydays`,
        { params: queryParams } // Pass query parameters in the params property
      );

      return response.data;
    } catch (error) {
      throw exceptionHandler(error, `Error fetching aggrigated ${entity}s`);
    }
  }

  static async findOne(id: number): Promise<Sleep> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/${entity}s/${id}`);
      return response.data;
    } catch (error: unknown) {
      throw exceptionHandler(error, `Error fetching ${entity} by id`);
    }
  }

  static async update(
    id: number,
    sleep: Partial<Sleep>
  ): Promise<Sleep | null> {
    const payload = { ...sleep };
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/${entity}s/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw exceptionHandler(error, `Error updating ${entity}`);
    }
  }

  static async delete(id: number) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/${entity}s/${id}`
      );
      return response.data;
    } catch (error) {
      throw exceptionHandler(error, `Error deleting ${entity} by id`);
    }
  }
}
