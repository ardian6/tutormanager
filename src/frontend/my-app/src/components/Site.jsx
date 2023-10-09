import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import OpenIconSpeedDial from "./OpenIconSpeedDial";
import NavBar from "./NavBar";
import StudentProfile from "../pages/studentProfile"
import TutorProfile from "../pages/tutorProfile"
import {
  Routes,
  Route,
  //   Link,
  //   Redirect,
  //   useHistory,
  //   useLocation,
} from "react-router-dom";

function Site(props) {
  const [userType, setUserType] = React.useState(true);

  return (
    <div className="SiteContainer">
      {/* <NavBar></NavBar>
      <OpenIconSpeedDial></OpenIconSpeedDial> */}
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={userType ? <StudentProfile /> : <TutorProfile/> } />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque sodales justo, vitae venenatis tellus varius aliquet. Nulla quis magna at nibh interdum volutpat. Praesent ligula velit, bibendum eget nisi et, dapibus mattis turpis. Nunc eu tellus non velit ultricies placerat sit amet non quam. Donec mollis id nunc id lacinia. Vestibulum ac leo a nisi finibus interdum vel sed odio. Quisque congue fermentum porttitor. Duis dignissim sagittis blandit. Morbi at tortor turpis. Vivamus finibus lorem maximus purus imperdiet, in egestas diam laoreet. Duis eu tortor ligula.

        Maecenas sollicitudin orci vel dignissim aliquam. Phasellus sit amet arcu a quam varius rutrum vel eu turpis. Nullam vitae justo et enim dapibus sagittis. Fusce congue justo vulputate, fermentum metus id, luctus libero. Pellentesque et tellus in lorem porttitor pellentesque eget non nibh. Sed accumsan varius quam, et efficitur elit condimentum id. Proin rhoncus quam id odio pellentesque consectetur. Aenean diam turpis, auctor vitae quam eget, lobortis egestas justo. Suspendisse at condimentum sem. Nunc tincidunt, sem a viverra eleifend, nisl velit ultricies dolor, et commodo felis felis ac quam. Vivamus aliquam, est dapibus scelerisque rutrum, dui purus dictum orci, eget interdum ante diam vitae mauris. In nec est lectus. Nunc sit amet felis mollis, fringilla ipsum at, rhoncus tellus. Praesent sit amet tincidunt ipsum, consectetur blandit sem.

        Nunc aliquam scelerisque velit, lobortis feugiat tellus. Donec quis elit eget nunc ultrices vehicula. Quisque in ipsum sodales, gravida odio nec, varius lectus. Pellentesque eu diam semper, luctus urna a, faucibus ex. Integer euismod efficitur ex, fringilla feugiat dui consequat vel. Sed diam sapien, varius nec nisi ac, sollicitudin efficitur sem. Praesent eleifend est sed orci pulvinar, a rutrum turpis vehicula.

        Pellentesque vestibulum venenatis nisl vel sodales. Integer posuere magna semper lorem pharetra, vitae scelerisque orci tempus. Quisque non ante luctus, luctus arcu ut, eleifend purus. Nulla velit turpis, dignissim nec massa efficitur, iaculis commodo tortor. Nulla lacinia justo id ipsum ullamcorper scelerisque. Etiam egestas lorem eu nunc laoreet mattis. Sed tempus eros suscipit lorem malesuada, a sollicitudin elit porta. Aliquam varius diam vel bibendum tristique. Nunc in nibh id lectus sagittis vestibulum sit amet in mi. Maecenas eros velit, dapibus sed blandit id, blandit eget ipsum. Vestibulum consequat porttitor dui nec sodales.

        Duis non est at leo vestibulum aliquam imperdiet sed dolor. Vestibulum scelerisque scelerisque nisi vel laoreet. In luctus sit amet lorem pretium elementum. Ut tristique orci et semper tincidunt. Proin eu ex tincidunt, sagittis ex id, feugiat nibh. In hac habitasse platea dictumst. Aliquam vitae commodo dui. Suspendisse molestie sem vel tortor convallis, vel vulputate arcu efficitur. Morbi vel consectetur dui. Duis rutrum varius vehicula. Suspendisse fermentum mollis lorem, vestibulum sagittis odio eleifend ut. Duis elementum urna at varius rutrum. Praesent et dignissim sapien. Fusce facilisis, diam ut viverra vestibulum, augue arcu fermentum risus, vel euismod odio nisi at metus. Curabitur nec sapien nulla. Donec consequat ullamcorper enim, vitae viverra mauris tincidunt eget.

        Donec luctus molestie risus, elementum posuere eros bibendum eget. Sed tristique risus eget magna consectetur elementum. In lobortis felis sit amet libero placerat viverra id vitae metus. Donec varius ligula non dui mollis tristique. Donec tellus purus, maximus sit amet placerat vitae, finibus in ante. Nullam a urna convallis, tristique est lacinia, placerat sem. Donec non commodo massa, et convallis metus. Donec euismod turpis sit amet nisi laoreet, vitae ullamcorper sapien luctus. Sed porttitor eros eu massa laoreet, non ultricies lorem posuere. Curabitur egestas ac massa vitae consequat. Nulla facilisi. Integer ornare, ligula luctus iaculis aliquet, justo nunc interdum quam, mollis iaculis dolor lacus in dui. Nulla vehicula diam eu purus malesuada ornare.

        Suspendisse eu erat velit. Aenean tristique iaculis ipsum, eget vehicula eros sollicitudin sed. Praesent facilisis nisl ac placerat condimentum. Phasellus consequat euismod sapien sed mattis. Nunc egestas placerat justo non blandit. Nulla placerat elementum lacus, in vulputate quam feugiat ut. Cras gravida nulla vitae aliquet tempus. Aenean sit amet porta neque, non efficitur enim. Mauris placerat vestibulum ante, ultrices blandit est suscipit nec. Donec eu malesuada enim. Curabitur cursus luctus tortor, vitae aliquet magna fringilla in. Integer pellentesque eleifend massa accumsan sodales. Sed bibendum, eros rutrum aliquet fermentum, dui massa viverra lorem, sed suscipit nisl massa a sapien.

        Sed eros quam, lacinia ac mattis ornare, pretium posuere lacus. Ut dignissim erat elementum pulvinar sodales. Suspendisse potenti. Sed ac augue vel leo commodo mattis a a libero. Ut turpis odio, commodo sit amet lacinia at, aliquam mollis urna. Praesent commodo, urna et laoreet pretium, quam leo molestie orci, at venenatis augue est at purus. Pellentesque ac varius dolor, ut malesuada tellus. Vivamus consectetur arcu mauris, id convallis quam maximus et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed non lorem sit amet dui tristique consequat ut vel erat. Aliquam placerat congue arcu iaculis rhoncus. Aliquam tincidunt nulla vitae risus vestibulum interdum. Sed mollis pretium est, laoreet posuere libero pulvinar quis. Curabitur non cursus leo, at commodo magna. Proin hendrerit, felis a vulputate ornare, mi urna vehicula odio, at ullamcorper justo magna sit amet justo.
      </div> */}
    </div>
  );
}

export default Site;
