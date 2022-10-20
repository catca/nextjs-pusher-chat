import type { NextPage } from "next";

type HomeProps = {
  handleLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Home = ({ handleLoginChange, handleLogin }: HomeProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="h-fit w-fit bg-gray-700 p-4 rounded-md"
      >
        <p className="text-white text-center font-medium mb-2">
          Choose your Username
        </p>
        <input
          type="text"
          placeholder="Enter Your Username"
          onChange={handleLoginChange}
          className="h-10 border-2 border-solid border-white bg-white outline-none focus:border-blue-500 focus:border-2 text-black p-2 rounded-md block"
        />
        <button
          type="submit"
          className="px-4 h-10 border-2 border-solid border-blue-500 text-blue-500 bg-white hover:bg-blue-500 py-2 hover:text-white w-full mt-4 rounded-md uppercase font-medium focus:bg-blue-500 focus:text-white outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Home;
