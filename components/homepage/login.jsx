import { ClassicInput } from "@/components/ui/inputs";
import { ClassicTabs } from "@/components/ui/tabs";
// import {Button} from "@heroui/button";
// import {Tabs, Tab} from "@heroui/tabs";
import {useState} from "react";
import {Tab, Input, Link, Button, Card, CardBody} from "@heroui/react";

const LoginPage = () => {
    // return (
    //     <div className="max-w-md mx-auto mb-10">
    //         <div className="overflow-hidden rounded-lg shadow-lg bg-grey-cso-dark">
    //             {/* Tabs */}
    //             <div className="flex bg-orange-cso">
    //                 <button className="flex-1 py-3 font-semibold text-white transition-colors hover:bg-orange-cso/90">
    //                     Sign in
    //                 </button>
    //                 <button className="flex-1 py-3 font-semibold transition-colors text-white/80 hover:bg-orange-cso/90">
    //                     Sign up
    //                 </button>
    //             </div>

    //             {/* Content */}
    //             <div className="p-6">
    //                 {/* Social Auth Buttons */}
    //                 <div className="flex justify-center gap-3 mb-6">
    //                     <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-red-500 rounded hover:bg-red-600">
    //                         <span className="text-sm font-bold">G</span>
    //                     </button>
    //                     <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700">
    //                         <span className="text-sm font-bold">f</span>
    //                     </button>
    //                     <button className="flex items-center justify-center w-10 h-10 text-white transition-colors rounded bg-sky-500 hover:bg-sky-600">
    //                         <span className="text-sm font-bold">𝕏</span>
    //                     </button>
    //                     <button className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-indigo-600 rounded hover:bg-indigo-700">
    //                         <span className="text-sm font-bold">D</span>
    //                     </button>
    //                 </div>

    //                 {/* Login Form */}
    //                 <form className="space-y-4">
    //                     <div>
    //                         {/* <input
    //                             id="email"
    //                             name="email"
    //                             type="text"
    //                             maxLength="100"
    //                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-cso focus:border-transparent"
    //                         /> */}
    //                         <ClassicInput type="text" name="email" variant="faded" label="Email/Username" placeholder="@" />
    //                     </div>

    //                     <div>
    //                         <ClassicInput type="password" name="password" variant="faded" label="Password" placeholder="••••••••" />
    //                     </div>

    //                     {/* <button
    //                         type="submit"
    //                         className="w-full px-4 py-2 font-semibold text-white transition-colors rounded-md bg-orange-cso hover:bg-orange-cso/90"
    //                     >
    //                         Connect
    //                     </button> */}
    //                     <Button className="w-full" type="submit" color="primary">Connect</Button>

    //                     <div className="text-sm text-center text-white">
    //                         <a
    //                             href="#"
    //                             className="transition-colors hover:text-orange-cso"
    //                         >
    //                             Forgotten password?
    //                         </a>
    //                         <span className="mx-2">|</span>
    //                         <a
    //                             href="#"
    //                             className="transition-colors hover:text-orange-cso"
    //                         >
    //                             First visit? Sign up
    //                         </a>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );
    const [selected, setSelected] = useState("login");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="p-0 overflow-hidden">
          <ClassicTabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={setSelected}
            variant="cso"
          >
            <Tab key="login" title="Sign in">
              <form className="flex flex-col gap-4 p-6">
                <ClassicInput isRequired label="Email" placeholder="Enter your email" type="email" variant="faded" />
                <ClassicInput
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="faded"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex justify-end gap-2">
                  <Button fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px] p-6">
                <ClassicInput isRequired label="Name" placeholder="Enter your name" type="password" variant="faded" />
                <ClassicInput isRequired label="Email" placeholder="Enter your email" type="email" variant="faded" />
                <ClassicInput
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="faded"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex justify-end gap-2">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </ClassicTabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
